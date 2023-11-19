import './src/scripts/reloadButton.js'
import './src/scripts/restartButton.js'

import { renderer } from './src/scripts/renderer.js';
import { registerForUpdates } from './src/scripts/downloadMonitor.js';
import { handleSuperNavChanges } from './src/scripts/superNavObserver.js';
import { handleLibraryContainerResize } from './src/scripts/libraryContainerObserver.js';

console.log('Loading components...');
renderer();

console.log('Registering for download overview...');
registerForUpdates();

console.log('Watching supernav');
handleSuperNavChanges();

console.log('observing library cotainer')
handleLibraryContainerResize()

// help skin element that dissappear
document.addEventListener('keyup', (e) => { if (e.ctrlKey && e.code === 'ArrowDown') { debugger; } }, false);