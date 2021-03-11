import CodeMirror from 'codemirror';
import { Spectral, isOpenApiv2, isOpenApiv3 } from '@stoplight/spectral';

const spectral = new Spectral();
spectral.registerFormat(`oas2`, isOpenApiv2);
spectral.registerFormat(`oas3`, isOpenApiv3);
spectral.loadRuleset(`spectral:oas`);

CodeMirror.registerHelper('lint', 'openapi', async function(text) {
  const results = await spectral.run(text);

  return results.map(result => ({
    from: CodeMirror.Pos(result.range.start.line, result.range.start.chracter),
    to: CodeMirror.Pos(result.range.end.line, result.range.end.chracter),
    message: result.message,
  }));
});
