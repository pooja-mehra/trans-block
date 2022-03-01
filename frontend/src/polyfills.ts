import 'zone.js';
import * as process from 'process';
import { Buffer } from 'buffer';
declare const global: any;
declare const window: any;

window.process = process;
(window as any).global = window;
global.Buffer = global.Buffer || Buffer;