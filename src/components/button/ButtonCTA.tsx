import { Slot, component$,  } from '@builder.io/qwik';
import { Blocks, BuilderBlock  } from '@builder.io/sdk-qwik';
 
const ButtonCTA = component$((props: { children: BuilderBlock }) => {
  return (
    <button>
      Content: <Slot />

      <Blocks
            parent={builderBlock?.id}
            path={`component?.options?.tabList?.${activeTab}.children`}
            blocks={tabList[activeTab]?.children}
        />
    </button>
  );
});
 
export default component$((props: { children: BuilderBlock }) => {
  return (
    <ButtonCTA>
      This goes inside {'<Button>'} component marked by{`<Slot>`}
    </ButtonCTA>
  );
});