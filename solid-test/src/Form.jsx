/** name,
 * {
 *    label,
 *    name,
 *  }
 *
 */

import { For } from "solid-js";

const Form = (props) => {
  return (
    <form
      name={props.name}
      classList={props.classList}
      onSubmit={(e) => e.preventDefault()}
    >
      <For each={props.items}>
        {(item) => (
          <label>
            {item.label}
            <input name={item.name} type="text" />
          </label>
        )}
      </For>
    </form>
  );
};

export default Form;
