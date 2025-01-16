import { Accordion, AccordionItem } from './accordion'
import { component$ } from '@builder.io/qwik'

export default component$(() => (
  <Accordion title="My Accordion">
    <AccordionItem title="Item 1">
      <p>Content for item 1</p>
    </AccordionItem>
    <AccordionItem title="Item 2">
      <p>Content for item 2</p>
    </AccordionItem>
    <AccordionItem title="Item 3">
      <p>Content for item 3</p>
    </AccordionItem>
  </Accordion>
))
