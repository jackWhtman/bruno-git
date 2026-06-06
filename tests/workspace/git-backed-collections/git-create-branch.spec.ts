import path from 'path';
import fs from 'fs';
import { execSync } from 'child_process';
import { test, expect, closeElectronApp } from '../../../playwright';
import { switchWorkspace, waitForReadyPage } from '../../utils/page';

const initUserDataPath = path.join(__dirname, 'init-user-data');
const fixturesPath = path.join(__dirname, 'fixtures');

const FIXTURE_WS_NAME = 'Fixture WS';

async function copyFixture(fixtureName: string, destDir: string): Promise<string> {
  const src = path.join(fixturesPath, fixtureName);
  await fs.promises.cp(src, destDir, { recursive: true });
  return destDir;
}

test.describe('Git Branch Creation UI', () => {
  test('creates a new branch successfully', async ({ launchElectronApp, createTmpDir }) => {
    const workspacePath = await createTmpDir('git-ws-create-branch');
    await copyFixture('workspace-with-collection', workspacePath);

    // Initialize a git repository in the workspace path / collections / sample-coll
    const collectionPath = path.join(workspacePath, 'collections', 'sample-coll');
    execSync('git init', { cwd: collectionPath });
    execSync('git config user.name "Test User"', { cwd: collectionPath });
    execSync('git config user.email "test@example.com"', { cwd: collectionPath });
    execSync('git add .', { cwd: collectionPath });
    execSync('git commit -m "Initial commit"', { cwd: collectionPath });

    const app = await launchElectronApp({ initUserDataPath, templateVars: { workspacePath } });
    const page = await waitForReadyPage(app);

    await switchWorkspace(page, FIXTURE_WS_NAME);

    // Open the collection in the sidebar so the CollectionHeader is rendered and git status is fetched
    const sidebarCollection = page.locator('#sidebar-collection-name').filter({ hasText: 'SampleColl' });
    await sidebarCollection.waitFor({ state: 'visible', timeout: 5000 });
    await sidebarCollection.click();

    // 1. Wait for Git branch button to be visible and click it to open Git UI
    const gitBranchBtn = page.getByRole('button', { name: /master|main/i }).first();
    await expect(gitBranchBtn).toBeVisible({ timeout: 15000 });
    await gitBranchBtn.click();

    // 2. Locate the branch dropdown button inside the Git UI sidebar
    const sidebarBranchDropdown = page.locator('.branch-select-section button');
    await expect(sidebarBranchDropdown).toBeVisible({ timeout: 10000 });
    await sidebarBranchDropdown.click();

    // 3. Click "Create New Branch..." dropdown option
    const createOption = page.locator('.dropdown-item, [role="menuitem"]').filter({ hasText: 'Create New Branch...' });
    await expect(createOption).toBeVisible({ timeout: 5000 });
    await createOption.click();

    // 4. Verify modal is visible
    const modal = page.locator('.bruno-modal-card').filter({ hasText: 'Create New Branch' });
    await expect(modal).toBeVisible({ timeout: 5000 });

    // 5. Fill modal input with validation-failing inputs first to test validation
    const input = modal.locator('input[name="branchName"]');
    const submitBtn = modal.getByRole('button', { name: 'Create', exact: true });

    // Test initially disabled
    await expect(submitBtn).toBeDisabled();

    // Test validation: spaces
    await input.fill('invalid branch');
    await expect(modal.locator('.text-red-500')).toContainText('Branch name cannot contain spaces', { timeout: 3000 });
    await expect(submitBtn).toBeDisabled();

    // Test validation: empty
    await input.fill('');
    await expect(modal.locator('.text-red-500')).toContainText('Branch name is required', { timeout: 3000 });
    await expect(submitBtn).toBeDisabled();

    // 6. Fill valid branch name and submit
    await input.fill('feature-test-branch');
    await expect(modal.locator('.text-red-500')).toHaveCount(0);
    await expect(submitBtn).toBeEnabled();
    await submitBtn.click();

    // 7. Verify modal closes and branch switches to feature-test-branch
    await expect(modal).not.toBeVisible({ timeout: 5000 });

    // Check toast message or checkout branch success toast
    await expect(page.getByText('Created and switched to branch feature-test-branch')).toBeVisible({ timeout: 10000 });

    // Verify current branch button shows the new branch
    const updatedGitBranchBtn = page.getByRole('button', { name: 'feature-test-branch' }).first();
    await expect(updatedGitBranchBtn).toBeVisible({ timeout: 10000 });

    await closeElectronApp(app);
  });
});
