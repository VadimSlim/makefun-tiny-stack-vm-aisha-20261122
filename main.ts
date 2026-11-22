//import fs and path
const fs = require('fs');
const path = require('path');

//read input root from process.env.MAKEFUN_INPUT_DIR or /input
const inputRoot = process.env.MAKEFUN_INPUT_DIR || './input';
const outputRoot = process.env.MAKEFUN_OUTPUT_DIR || './output';

//iterate immediate input subdirectories
fs.readdirSync(inputRoot).forEach(dir => {
  const dirPath = path.join(inputRoot, dir);
  if (fs.statSync(dirPath).isDirectory()) {
    //read program.bin
    const programBinPath = path.join(dirPath, 'program.bin');
    const programBinContent = fs.readFileSync(programBinPath);

    //mkdir matching output subdirectory recursively
    const outputDirPath = path.join(outputRoot, dir);
    if (!fs.existsSync(outputDirPath)) {
      fs.mkdirSync(outputDirPath, { recursive: true });
    }

    //write empty stdout.bin and exit.txt containing 0 and a newline
    const stdoutBinPath = path.join(outputDirPath, 'stdout.bin');
    fs.writeFileSync(stdoutBinPath, '');

    const exitTxtPath = path.join(outputDirPath, 'exit.txt');
const exitCode = (() => { let pc = 0, stack = [], output = []; const memory = new Int32Array(256); const callStack = []; const inputBytes = fs.readFileSync(path.join(dirPath, "input.bin")); let inputPos = 0; let steps = 0; while (true) { if (++steps > 1000000) return 10; if (pc < 0 || pc >= programBinContent.length) return 9;
  const op = programBinContent[pc++];
  switch(op) {
    case 0x00: return 0;
    case 0x01: if (pc >= programBinContent.length) return 9; { const v = programBinContent[pc++]; if (stack.length >= 256) return 3; stack.push((v << 24) >> 24); } break;
    case 0x02: if (pc + 4 > programBinContent.length) return 9; if (stack.length >= 256) return 3; stack.push(programBinContent.readInt32LE(pc)); pc += 4; break;
    case 0x03: if (stack.length === 0) return 2; stack.pop(); break;
    case 0x04: if (stack.length === 0) return 2; if (stack.length >= 256) return 3; stack.push(stack[stack.length-1]); break;
    case 0x05: if (stack.length < 2) return 2; { const a=stack.pop(), b=stack.pop(); stack.push(a,b); } break;
    case 0x06: if (stack.length < 2) return 2; if (stack.length >= 256) return 3; stack.push(stack[stack.length-2]); break;
    case 0x07: if (stack.length < 3) return 2; { const c=stack.pop(), b=stack.pop(), a=stack.pop(); stack.push(b,c,a); } break;
    case 0x10: if (stack.length < 2) return 2; { const b=stack.pop(), a=stack.pop(); stack.push((a+b)|0); } break;
    case 0x11: if (stack.length < 2) return 2; { const b=stack.pop(), a=stack.pop(); stack.push((a-b)|0); } break;
    case 0x12: if (stack.length < 2) return 2; { const b=stack.pop(), a=stack.pop(); stack.push(Math.imul(a,b)); } break;
     case 0x13: if(stack.length<2)return 2; {const b=stack.pop()|0,a=stack.pop()|0;if(b===0)return 4;stack.push(Math.trunc(a/b)|0);} break;
    case 0x14: if(stack.length<2)return 2; {const b=stack.pop()|0,a=stack.pop()|0;if(b===0)return 4;stack.push((a%b)|0);} break;
    case 0x15: if(stack.length<2)return 2; {const b=stack.pop()>>>0,a=stack.pop()>>>0;if(b===0)return 4;stack.push(Math.floor(a/b)|0);} break;
     case 0x16: if(stack.length<2)return 2; {const b=stack.pop()>>>0,a=stack.pop()>>>0;if(b===0)return 4;stack.push((a%b)|0);} break;
    case 0x17: if(stack.length<1)return 2;stack.push((-stack.pop())|0);break;
    case 0x18: if(stack.length<2)return 2; {const b=stack.pop(),a=stack.pop();stack.push(a&b);} break;
    case 0x19: if(stack.length<2)return 2; {const b=stack.pop(),a=stack.pop();stack.push(a|b);} break;
    case 0x1a: if(stack.length<2)return 2; {const b=stack.pop(),a=stack.pop();stack.push(a^b);} break;
    case 0x1b: if(stack.length<1)return 2;stack.push(~stack.pop());break;
    case 0x1c: if(stack.length<2)return 2; {const b=stack.pop(),a=stack.pop();stack.push(a<<(b&31));} break;
    case 0x1d: if(stack.length<2)return 2; {const b=stack.pop(),a=stack.pop();stack.push(a>>(b&31));} break;
    case 0x1e: if(stack.length<2)return 2; {const b=stack.pop(),a=stack.pop();stack.push(a>>>(b&31));} break;
    case 0x20: if (stack.length < 2) return 2; { const b=stack.pop(), a=stack.pop(); stack.push(a===b ? 1 : 0); } break;
    case 0x21: if (stack.length < 2) return 2; { const b=stack.pop(), a=stack.pop(); stack.push((a|0)<(b|0) ? 1 : 0); } break;
    case 0x22: if (stack.length < 2) return 2; { const b=stack.pop(), a=stack.pop(); stack.push((a>>>0)<(b>>>0) ? 1 : 0); } break;
    case 0x30: if (pc + 2 > programBinContent.length) return 9; { const offset=programBinContent.readInt16LE(pc); pc += 2; pc += offset; } break;
    case 0x31: if (pc + 2 > programBinContent.length) return 9; { const offset=programBinContent.readInt16LE(pc); pc += 2; if (stack.length===0) return 2; if (stack.pop()===0) pc += offset; } break;
    case 0x32: if (pc + 2 > programBinContent.length) return 9; { const offset=programBinContent.readInt16LE(pc); pc += 2; if (stack.length===0) return 2; if (stack.pop()!==0) pc += offset; } break;
    case 0x33: if(pc+2>programBinContent.length)return 9; {const addr=programBinContent.readUInt16LE(pc);pc+=2;if(callStack.length>=64)return 7;callStack.push(pc);pc=addr;} break;
    case 0x34: if(callStack.length===0)return 8;pc=callStack.pop();break;
    case 0x40: if(stack.length===0)return 2; {const addr=stack.pop();if(addr<0||addr>255)return 6;stack.push(memory[addr]);} break;
    case 0x41: if(stack.length<2)return 2; {const addr=stack.pop(),value=stack.pop();if(addr<0||addr>255)return 6;memory[addr]=value|0;} break;
    case 0x52: if(stack.length>=256)return 3;stack.push(inputPos<inputBytes.length?inputBytes[inputPos++]:-1);break;
    case 0x50: { if (stack.length === 0) return 2; const bytes = Buffer.from(String(stack.pop() | 0), "ascii"); if (output.length + bytes.length > 65536) return 11; output.push(...bytes); fs.writeFileSync(stdoutBinPath, Buffer.from(output)); break; }
    case 0x51: if (stack.length === 0) return 2; if (output.length >= 65536) return 11; output.push(stack.pop() & 255); if(output.length<1024||output.length%1024===0)fs.writeFileSync(stdoutBinPath, Buffer.from(output)); break;
    case 0x53: if (stack.length === 0) return 2; return stack.pop() & 255;
    default: return 5;
  }
}

output.splice(output.length-1, 1);
fs.writeFileSync(stdoutBinPath,Buffer.from(output));
return 9; 
})();
fs.writeFileSync(exitTxtPath, String(exitCode) + String.fromCharCode(10));
return;
    fs.writeFileSync(exitTxtPath, '0\n');
  }
});