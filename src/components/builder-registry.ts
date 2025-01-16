import { Button, type RegisteredComponent, register } from "@builder.io/sdk-qwik";
import Counter from "./counter/counter";
import {Tabs}  from './tabs/tabs';
import {HeadingH3} from './Heading/heading';

import AccordionWithItems from './accordion/accordion';
import { Description } from "./Description/description";


export const CUSTOM_COMPONENTS: RegisteredComponent[] = [
  {
    component: "ButtonCTA",
    name: "ButtonCTA",
    inputs: [
      {
        name: "children",
        type: "blocks",
        defaultValue: [
          {
            "@type": "@builder.io/sdk:Element",
            component: {
              name: "Text",
              options: {
                text: "This is editable block within the builder editor",
              },
            },
            responsiveStyles: {
              large: {
                display: "flex",
                flexDirection: "column",
                position: "relative",
                flexShrink: "0",
                boxSizing: "border-box",
                marginTop: "8px",
                lineHeight: "normal",
                height: "200px",
                textAlign: "left",
                minHeight: "200px",
              },
              small: {
                height: "200px",
              },
            },
          },
        ],
      },
    ],
  },
  {
    component: Counter,
    name: "Counter",
    inputs: [
      {
        name: "initialValue",
        type: "number",
      },
    ],
  },
  {
    component: HeadingH3,
    name: "Heading",
    inputs: [
      {
        name: "title",
        type: "text",
        defaultValue: "Hello Builder.io!!!",
      },
    ],
  },
  {
    component: Description,
    name: "Description",
    inputs: [
      {
        name: "description",
        type: "text",
      },
    ],
  },
  {
    component: AccordionWithItems,
    name: "AccordionWithItems",
    inputs: [
      {
        name: 'class',
        type: 'text',
        helperText: 'CSS class to style the accordion',
      },
      {
        name: 'title',
        type: 'text',
        helperText: 'Title for the accordion',
      },
      {
        name: 'items',
        type: 'list',
        subFields: [
          {
            name: 'title',
            type: 'text',
            helperText: 'Title for the accordion item',
            required: true,
          },
          {
            name: 'content',
            type: 'longText',
            helperText: 'Content for the accordion item',
          },
        ],
      },
    ],
  },
  {
    component: Tabs,
    name: 'Tabs',
    canHaveChildren: true,
    shouldReceiveBuilderProps: {
      builderBlock: true,
    },
    inputs: [
      {
        name: 'tabs',
        type: 'list',
        subFields: [
          {
            name: 'label',
            type: 'text',
            defaultValue: 'New tab',
          },
          {
            name: 'content',
            type: 'uiBlocks',
            defaultValue: [],
          },
        ],
        defaultValue: [
          {
            label: 'Tab 1',
            content: [],
          },
        ],
      },
    ],
  }
];

register('insertMenu', {
  name: 'Our components',
  items: [
    { name: 'Counter' },
    { name: 'Tabs' }
  ],
});