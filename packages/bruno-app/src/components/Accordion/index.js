import React, { createContext, useContext, useState } from 'react';
import { IconChevronDown } from '@tabler/icons';
import { AccordionItem, AccordionHeader, AccordionContent } from './styledWrapper';

const AccordionContext = createContext();

const Accordion = ({ children, defaultIndex, allowMultiple = false, dataTestId }) => {
  const [openIndexes, setOpenIndexes] = useState(() => {
    if (allowMultiple) {
      return Array.isArray(defaultIndex) ? defaultIndex : (defaultIndex !== undefined ? [defaultIndex] : []);
    }
    return defaultIndex;
  });

  const toggleItem = (index) => {
    if (allowMultiple) {
      setOpenIndexes((prev) => {
        if (prev.includes(index)) {
          return prev.filter((i) => i !== index);
        }
        return [...prev, index];
      });
    } else {
      setOpenIndexes((prev) => (prev === index ? null : index));
    }
  };

  const isItemOpen = (index) => {
    if (allowMultiple) {
      return openIndexes.includes(index);
    }
    return openIndexes === index;
  };

  return (
    <AccordionContext.Provider value={{ toggleItem, isItemOpen }}>
      <div data-testid={dataTestId}>{children}</div>
    </AccordionContext.Provider>
  );
};

const Item = ({ index, children, ...props }) => {
  return (
    <AccordionItem {...props}>
      {React.Children.map(children, (child) => React.cloneElement(child, { index }))}
    </AccordionItem>
  );
};

export const Header = ({ index, children, ...props }) => {
  const { isItemOpen, toggleItem } = useContext(AccordionContext);
  const isOpen = isItemOpen(index);

  return (
    <AccordionHeader onClick={() => toggleItem(index)} {...props} className={isOpen ? 'open' : ''}>
      <div className="w-full">{children}</div>

      <IconChevronDown
        className="w-5 h-5 ml-auto"
        style={{
          transform: `rotate(${isOpen ? '180deg' : '0deg'})`,
          transition: 'transform 0.3s ease-in-out'
        }}
      />
    </AccordionHeader>
  );
};

const Content = ({ index, children, ...props }) => {
  const { isItemOpen } = useContext(AccordionContext);
  const isOpen = isItemOpen(index);

  return (
    <AccordionContent isOpen={isOpen} {...props}>
      {children}
    </AccordionContent>
  );
};

Accordion.Item = Item;
Accordion.Header = Header;
Accordion.Content = Content;
export default Accordion;
