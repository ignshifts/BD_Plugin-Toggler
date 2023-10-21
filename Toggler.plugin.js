/**
 * @name Toggler
 * @author Shifts
 * @authorId 994717305542021244
 * @description Toggle all BetterDiscord plugins at once.
 * @version 1.0.0
 * @source https://github.com/ignshifts/BypassNSFW
 * @updateUrl https://github.com/ignshifts/BypassNSFW/raw/main/BypassNSFW.plugin.js
 */
module.exports = class Toggler {

    start() {
        toggle()
    }
    stop() {
    };
}

async function toggle() {
  const plugins = BdApi.Plugins.getAll();
  const options = [
    { label: "Enable", value: "enable" },
    { label: "Disable", value: "disable" },
  ];
  
  const Dropdown = () => {
    const [selectedOption, setSelectedOption] = BdApi.React.useState(null);
  
    const handleOptionChange = (option) => {
      setSelectedOption(option);
      plugins.forEach(plugin => {
        if (option !== "Select an option") {
          if(option == "disable") {
            if(plugin.name === "Toggler") { BdApi.Plugins.disable(plugin.id); return; }
            BdApi.Plugins.disable(plugin.id);
            BdApi.UI.showToast(`[Toggler] Disabled ${plugin.name}`, { type: "error" });
        } else if (option === "enable") {
            if(plugin.name === "Toggler") { BdApi.Plugins.disable(plugin.id); return; }
            BdApi.Plugins.enable(plugin.id);
            BdApi.UI.showToast(`[Toggler] Enabled ${plugin.name}`, { type: "success" });
        }
      }
    });
    };

    return BdApi.React.createElement(
      "div",
      { className: "dropdown-container" },
      BdApi.React.createElement(
        "select",
        {
          value: selectedOption,
          onChange: (e) =>
            handleOptionChange(e.target.options[e.target.selectedIndex].value),
        },
        BdApi.React.createElement("option", { value: null }, "Select an option"),
        options.map((option) =>
        BdApi.React.createElement(
            "option",
            { key: option.value, value: option.value },
            option.label
          )
        )
      )
    );
  };
  BdApi.UI.showConfirmationModal("Dropdown", BdApi.React.createElement(Dropdown));
}
