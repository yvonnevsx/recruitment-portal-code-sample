import jsonDiff from 'json-diff';

import us from './translations/en-US.json' with { type: 'json' };
import nl from './translations/nl-NL.json' with { type: 'json' };

const diff = jsonDiff.diffString(nl, us, { keysOnly: true });

if (diff) {
  throw diff;
}
