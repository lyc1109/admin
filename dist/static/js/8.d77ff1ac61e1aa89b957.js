webpackJsonp([8],{619:function(t,e,o){var r=o(226)(o(664),o(648),null,null);t.exports=r.exports},648:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"full-height valign-center"},[o("div",{staticClass:"align-center block-center font-light"},[o("div",{staticClass:"inline-block"},[o("mt-spinner",{attrs:{type:"double-bounce",color:"#bbbec4",size:28}})],1),t._v(" "),o("p",{staticClass:"margin-top"},[t._v("正在登出系统，请稍候...")])])])},staticRenderFns:[]}},664:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=(o(230),o(60));e.default={name:"logout",created:function(){var t=this;this.$http.post(this.$basehost+"/logout").then(function(e){var o="";"USER"===t.$store.getters[r.a.oauth.getRole]?o="/shop_"+t.$store.getters[r.a.oauth.getCurShop].id:o="/index";t.$store.commit(r.a.oauth.updateAuthToken,""),t.$store.commit(r.a.oauth.updateCurUser,null),t.$store.commit(r.a.oauth.updateCurShop,null),t.$router.replace({path:"/login",query:{redirect:o}})})}}}});
//# sourceMappingURL=8.d77ff1ac61e1aa89b957.js.map