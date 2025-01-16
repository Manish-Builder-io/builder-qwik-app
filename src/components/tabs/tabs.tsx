import { component$, $, useSignal } from '@builder.io/qwik';
import { BuilderBlock, Blocks } from '@builder.io/sdk-qwik';

type Tab = {
  label: string;
  content: BuilderBlock[];
};

type TabsProps = {
  tabs: Tab[];
  builderBlock?: {
    id: string;
  };
};

export const Tabs = component$((props: TabsProps) => {
  const activeTab = useSignal(0);

  const handleTabClick = $(index => {
    activeTab.value = index;
  });

  return (
    <>
      <div
        style={{
          display: 'flex',
          overflow: 'auto',
        }}
      >
        {props.tabs.map((item, index) => (
          <span
            key={index}
            style={{
              padding: '20px',
              color: activeTab.value === index ? 'white' : '#ccc',
            }}
            onClick$={() => handleTabClick(index)}
          >
            {item.label}
          </span>
        ))}
      </div>
      {props.tabs.length > 0 && props.builderBlock && (
        <Blocks
          parent={props.builderBlock.id}
          path={`component.options.tabs.${activeTab.value}.content`}
          blocks={props.tabs[activeTab.value].content}
        />
      )}
    </>
  );
});