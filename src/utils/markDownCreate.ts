import '@kangc/v-md-editor/lib/style/base-editor.css';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import '@kangc/v-md-editor/lib/plugins/emoji/emoji.css';
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css';
import '~/assets/styles/essay.css'

/* ------------Markdown-------------- */
//@ts-ignore
import VueMarkdownEditor from '@kangc/v-md-editor';
//@ts-ignore
import Prism from 'prismjs';

//@ts-ignore
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';

VueMarkdownEditor.use(vuepressTheme, {
  Prism,
})
export default VueMarkdownEditor
/* ------------Markdown-------------- */
