// import Component from "@glimmer/component";
// import { action } from "@ember/object";
// import { service } from "@ember/service";
// import { on } from "@ember/modifier";
// import { modifier } from "@ember/modifier";

// export default class AutomaticTimezoneComponent extends Component {
//   @service currentUser;

//   checkTimezone = modifier(() => {
//     if (!this.currentUser) {
//       return;
//     }

//     const browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
//     if (this.currentUser.timezone !== browserTimezone) {
//       this.currentUser.set("timezone", browserTimezone);
//       this.currentUser.save();
//     }
//   });

//   <template>
//     <div {{this.checkTimezone}}></div>
//   </template>
// }
