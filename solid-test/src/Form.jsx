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
          id={"form_name"}
          name={props.name}
          classList={props.classList}
          onSubmit={(e) =>{
              e.preventDefault();
              props.onSubmit?.(e);
          }}
      >
        <For each={props.items}>
          {(item) => (
              <div>
                <label htmlFor={item.name}>{item.label}</label>
                <input id={item.name} name={item.name} type="text" required={item.required} />
              </div>
          )}
        </For>
      </form>
  );
};

export default Form;
