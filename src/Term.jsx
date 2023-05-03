import {useEffect} from "react";
import {Terminal} from "xterm";
import {LinkProvider} from "xterm-link-provider";
import {loadPyodide} from "pyodide";
import commands from "./Command.jsx";
import i18next from "./I18n.jsx";
import "./Xterm.scss";


export const log = () => {
    console.log.apply(JSON.stringify(console), arguments);
};

export async function sleep(s) {
    return new Promise(res => setTimeout(res, s));
}

export const fade = () => {
    /**
     * Function that gradually removes loading CSS animations.
     *
     * @default null
     */
    let loader = document.querySelector("#loader");
    if (loader) {
        loader.classList.add("fading");
        loader.addEventListener("transitionend", () => {
            for (let doc of document.querySelectorAll("#loader")) {
                doc.parentNode.removeChild(doc);
            }
        });
    }
}

export async function initialize() {
    /**
     * Function that allows to initialize the loading of Pyodide packages.
     * If necessary, the code emulates a basic logical behavior.
     *
     * @default null
     */
    try {
        self.pyodide = await loadPyodide({
            indexURL: "/assets/", stdout: (msg) => {
                self.term.write(`\n${msg}`);
            }, fullStdLib: false
        });
        generation().catch(console.error);
    } catch (err) {
        fade();
        if (i18next) {
            alert(i18next?.t("old"));
        } else {
            alert("Your browser is not supported here. Please update to a more recent one.");
        }
    }
}

export async function generation() {
    /**
     * This `async` function is used to convert a SVG avatar string
     * generated from the aesthetic Python script to a PNG image
     * with JavaScript in order to be displayable on the `Terminal`.
     *
     * @todo optimization
     * @async true
     * @default null
     */
    if (typeof self.pyodide === "undefined") {
        return;
    }
    self.svg = await self.pyodide.runPythonAsync(`
        from hashlib import blake2b; from importlib import util; from js import fetch
        from os import _exit; from pathlib import Path; from sys import modules
        modules["antigravity"] = None; fbz, apy = Path("/home/pyodide/final.bz2"), Path("/home/pyodide/aesthetic.py")
        if not fbz.exists():
          final = (await (await fetch("/assets/final.bz2")).arrayBuffer()).to_py()
          if blake2b(final).hexdigest() == "54b6213e47effb93aa6aeddeef8f3a1281b3e4be2c86d5c76021be36bbd7a2800a8731494b380c605c81696f6916d6a7cbc5cbe51e51fbc8965a42e4b2291319": fbz.write_bytes(final)
          else: del final
        elif blake2b(fbz.read_bytes()).hexdigest() != "54b6213e47effb93aa6aeddeef8f3a1281b3e4be2c86d5c76021be36bbd7a2800a8731494b380c605c81696f6916d6a7cbc5cbe51e51fbc8965a42e4b2291319": _exit(0)
        if not apy.exists():  # FileNotFoundError
          ast   = (await (await fetch("/assets/aesthetic.py")).arrayBuffer()).to_py()  
          if blake2b(ast).hexdigest() == "55897b372cba4eaad9f6980251468cadacb29cd2751e175f329ef501bc66ed9ef64f1b416bb3a39e4ad0441ac59c20a993743c9a0e0db43212f0f2e7fe4be82e": apy.write_bytes(ast)
          else: del apy
        elif blake2b(apy.read_bytes()).hexdigest() != "55897b372cba4eaad9f6980251468cadacb29cd2751e175f329ef501bc66ed9ef64f1b416bb3a39e4ad0441ac59c20a993743c9a0e0db43212f0f2e7fe4be82e": _exit(0)
        if not modules.get("aesthetic"):
          spec  = util.spec_from_file_location("aesthetic", "/home/pyodide/aesthetic.py")
          asc   = util.module_from_spec(spec)
          spec.loader.exec_module(asc)
          modules["aesthetic"] = asc
        asc.demo((img := asc.make())); img.decode()
    `);
    if (self.svg) {
        self.img = new Image(320, 320);
        self.img.src = URL.createObjectURL(new Blob([self?.svg], {type: "image/svg+xml"}));
        self.img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = canvas.height = 35;
            canvas.getContext("2d").drawImage(self.img, 0, 0, 35, 35);
            self.dataURL = canvas.toDataURL("image/png");
            fade();
        };
    }
}

const bind = () => {
    /**
     * Function that handles the launch of the `Terminal` and methods
     * related to Pyodide for sending and receiving inputs/outputs.
     * Note that `cols` has to be synced for multiline display because
     * visualization of column length is variable depending on web browser.
     *
     * @strict false
     * @async none
     * @issue https://stackoverflow.com/questions/37284072
     * @default null
     */
    self.term = new Terminal({
        allowProposedApi: true,
        allowTransparency: true,
        altClickMovesCursor: true,
        cols: 102,
        convertEol: true,
        cursorBlink: "block",
        debug: false,
        fontFamily: "'Roboto Mono', monospace",
        fontWeight: 400,
        fontWeightBold: 700,
        logLevel: "off",
        rows: 30,
        screenReaderMode: false,
        scrollSensitivity: 1,
        termName: "Terminal",
        theme: {selectionBackground: "#0000FF55", background: "rgba(0, 0, 0, 0)"}
    });

    self.idx = 0;
    self.isMode = false; /* useState, useContext */
    const [audio, store] = [new Audio("/assets/wii.ogg"), new Map([["idx", {i: -1}], ["val", JSON.parse(localStorage.getItem("commands"))]])];
    let [command, state, tab] = ["", [false, false], 0];
    self.term.open(document.getElementById("console")); // No FitAddon

    self.term.show = (cmd) => {
        if (cmd) {
            if (cmd?.trim()?.match(new RegExp(/(((blob|dns|file|ftp|https|irc|rip|smtp|ssh|tcp|telnet|udp):)?(http|https):[/]{2})([^\s"'!*(){}|\\<>`]*[^\s"':,.!?{}|\\~\[\]`()<>])/gu))) {
                self.term.registerLinkProvider(new LinkProvider(self.term, new RegExp(`(${cmd})`, "gu"), (_, __) => {
                    window.open(cmd);
                }));
                self.term.writeln(`\x1b[2K\r>>> ${cmd}`);
            }
            const res = self.term.runPythonCode(cmd);
            if (!res) {
                self.term.write("\r\n>>> ");
            }
        } else {
            self.term.write("\r\n>>> ");
        }
    }

    self.term.run = (command) => {
        if (command?.length > 0 && commands) {
            let obj = Object.entries(commands)?.every(
                ([c]) => {
                    if (command.trim().startsWith(c)) {
                        switch (c) {
                            case "cat":
                                commands["cat"].f(command.trim());
                                return false;
                            case "cd":
                                commands["cd"].f(command.trim());
                                return false;
                            case "lang":
                                commands["lang"].f(command.trim());
                                return false;
                            case "ls":
                                commands["ls"].f(command.trim());
                                return false;
                            default:
                                if (command.trim() === c) {
                                    commands[c].f();
                                    return false;
                                }
                                return true;
                        }
                    }
                    return true;
                });
            if (!obj) {
                return;
            }
            self.term.show(command);
        } else {
            self.term.write("\r\n>>> ");
        }
    }

    self.term.handlePythonResult = (result) => {
        if (result === undefined) {
            self.term.write("\r\n>>> ");
            return false;
        } else {
            self.term.write(`\n${result?.toString()}\r\n>>> `);
            return true;
        }
    }

    self.term.handlePythonError = (result) => {
        self.term.write(`\n\x1b[31;1m${result?.toString()}\x1b[m\r>>> `);
        return true;
    }

    self.term.runPythonCode = async (code) => {
        if (typeof self.pyodide === "undefined") {
            return;
        }
        await self.pyodide.runPythonAsync(code).then(self.term.handlePythonResult, self.term.handlePythonError).catch(console.error);
        return true;
    }

    // todo https://cyber-guy.gitbook.io/cyber-guys-blog/blogs/the-art-of-vulnerability-chaining-pyscript CSP
    // todo Same-Origin Policy X-Frame-Header protection
    // todo pip-compile --generate-hashes .. Hash of all files ? or final/aesthetic.py ?? yarn gen

    if (i18next) {
        self.term.write(`${i18next?.t("home")}\r\n>>> `);
    } else {
        self.term.write(`Welcome to the \x1b[1mPython\x1b[0m web terminal emulator on \x1b[1mPyodide\x1b[0m over \x1b[1mWebAssembly\x1b[0m in ${new Date().getFullYear()} ⚙️\n` +
            "There is also a \x1b[1mSVG\x1b[0m avatar generator available by typing \x1b[1mgen\x1b[0m command (listed in \x1b[1mhelp\x1b[0m) below:\r\n>>> ");
    }
    if (store?.get("val")) {
        if (store.get("val").length > 512e3 || new Blob(Object?.values(localStorage))?.size > 512e6) {
            localStorage.clear();
            store.set("val", undefined);
            store.get("idx").i = -1;
            location.reload(); /** Resets the overload on home page */
        }
        store.get("idx").i = store.get("val").length - 1;
    }

    self.term.onBell(_ => {
        audio?.play();
    });

    self.term.onData(key => {
        /**
         * This property adds an event listener for when a data event fires.
         *
         * As on the `Divide and conquer` algorithm with IDE.
         * @todo Optimization
         * @default IEvent<string>
         */
        const [x, y] = [self.term.buffer.active.cursorX, self.term.buffer.active.cursorY];
        const line = (y >= 0) ? y : 0;
        let pos = 0;
        const wrapText = (key = "", pos = 0, line = 0, cmd = "") => {
            /**
             * This expression allows to resize a text for a single line display,
             * as with 2D-Arrays view.
             *
             * @todo Optimization
             * @default null
             */
            let [_, b, c, k, p, tot] = ["", [], "", [], 0, 0];
            if (command?.length > 0) {
                if (key?.length > 0) {
                    if (pos >= 1) {
                        p = parseInt(`${(command + key).length / 97}`);
                        if (p >= 1) {
                            tot = (line - self.idx) >= 1 ? (96 + (100 * ((line - self.idx) - 1)) + pos) : pos;
                            k = [command.substring(0, tot), command.substring(tot)];
                            command = k[0] + key + k[1];
                            cmd = command?.match(/(.{1,96})/g) || "";
                            _ = cmd?.shift();
                            b = cmd?.join("")?.match(/.{1,100}/g);
                            c = b?.join("\n");
                            if (b?.slice(-1)[0].length === 1 || c?.length === 1) {
                                self.term.write(`\n${key}`);
                            } else {
                                self.term.write(`${key}`);
                            }
                        } else {
                            k = [command.substring(0, pos), command.substring(pos)];
                            command = k[0] + key + k[1];
                            if (k[1].length === 0) {
                                self.term.write(`${key}`);
                            } else if (k[1].length >= 1) {
                                self.term.write(`\x1b[2K\r>>> ${command}\x1b[${k[1].length};D`);
                            }
                        }
                    } else {
                        command = key + command;
                        if (parseInt(`${command.length / 96}`) >= 1) {
                            self.term.write(`${key}`);
                        } else {
                            self.term.write(`\x1b[2K\r>>> ${command}\x1b[${command.length - 1};D`);
                        }
                    }
                }
            } else {
                if (key?.length > 0) {
                    command += key;
                    self.idx = line;
                    cmd = command?.match(/(.{1,96})/g);
                    if (cmd.length > 1) {
                        self.term.write(`${key}`);
                    } else {
                        self.term.write(`${key}`);
                    }
                }
            }
        }

        switch (key) {
            case "\u001b": // ESC
                location.reload();
                break;
            case "\u0001": // Ctrl+A
                if (x > 4 && command?.match(/(.{1,96})/g)?.length === 1) {
                    self.term.write(`\x1b[${x - 4};D`);
                }
                break;
            case "\u0009": // TAB
                ++tab;
                if (commands) {
                    let xb = Object.keys(commands).map((key) => String(key)).filter((v) => v.toLowerCase().startsWith(command?.split(/[\s\t]/).at(-1).toLowerCase()));
                    if (xb?.length > 0) {
                        if (xb.length === 1) {
                            if (tab === 1) {
                                let s = command?.trim().split(" ").slice(-1)[0];
                                if (s.indexOf(xb) === -1) {
                                    let z = xb[0].replace(s.trim(), "") + " ";
                                    command += z;
                                    tab = 0;
                                    self.term.write(z);
                                } else {
                                    command += " ";
                                    tab = 0;
                                    self.term.write(" ");
                                }
                            }
                        } else {
                            if (tab === 2) {
                                tab = 0;
                                self.term.write(`\n${xb.map(item => `${item}`).join("      ")}\r\n>>> ${command}`);
                            }
                        }
                    } else {
                        command += "\t";
                        tab = 0;
                        self.term.write("\t");
                    }
                } else {
                    command += "\t";
                    tab = 0;
                    self.term.write("\t");
                }
                tab = (tab >= 2) ? 0 : tab;
                break;
            case "\u0018": // Ctrl+X
                command += "\u0018";
                self.term.write("^X");
                break;
            case "\u0003": // Ctrl+C
                navigator.clipboard?.writeText(command); // Not on MacOS
                command = "";
                tab = 0;
                self.term.write("\nKeyboardInterrupt\r\n>>> ");
                break;
            case "\u0016": // Ctrl+Shift+V
                const elt = document.querySelector(".xterm-helper-textarea");
                const setter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value")?.set;
                setter?.call(elt, "value"); // throw new TypeError(elt.dispatchEvent(new Event("input", {bubbles: true})));
                throw new TypeError(""); // Hackish way without breaking
            case "\x1b\r": // Alt + Enter
                command += "\n";
                self.term.write("\n");
                break;
            case "\r": // Enter
                self.term.run(command);
                if (store?.get("val")) {
                    if (store.get("val").length > 0 && command?.length > 0) {
                        if (command !== store.get("val").at(-1)) {
                            store.get("val").push(command);
                            localStorage.setItem("commands", JSON.stringify(store.get("val")));
                            store.get("idx").i = store.get("val").length - 1;
                        } else {
                            ++store.get("idx").i;
                        }
                    }
                } else {
                    if (command?.length > 0) {
                        localStorage.setItem("commands", JSON.stringify([command]));
                        store.set("val", JSON.parse(localStorage.getItem("commands")));
                        store.get("idx").i = 0;
                    }
                }
                command = "";
                break;
            case "\u001b[A": // Up
                if (parseInt(`${command.length / 97}`) > 0) {
                    return;
                }
                if (store?.get("val")) {
                    if (store.get("idx").i >= 0) {
                        let last = store.get("val")[store.get("idx").i--];
                        if (state[1]) {
                            last = store.get("val")[store.get("idx").i--];
                            state[1] = false;
                        }
                        state[0] = true;
                        if (store.get("idx").i < 0) {
                            store.get("idx").i = 0;
                            state[0] = false;
                        }
                        self.term.write("\x1b[2K\r>>> ");
                        if (last) { // No multiline
                            if (/\r\n/.exec(last)) {
                                self.term.write(`${last}`);
                                return;
                            } else {
                                command = last;
                                self.term.write(`${last}`);
                            }
                        }
                    }
                }
                break;
            case "\u001b[B": // Down
                if (parseInt(`${command.length / 97}`) > 0) {
                    return;
                }
                if (store?.get("val")) {
                    if (store.get("idx").i < store.get("val").length) {
                        let first = store.get("val")[++store.get("idx").i];
                        if (state[0]) {
                            first = store.get("val")[++store.get("idx").i];
                            state[0] = false;
                            state[1] = true;
                        }
                        self.term.write("\x1b[2K\r>>> ");
                        if (first) {
                            command = first;
                            self.term.write(`${first}`);
                        } else {
                            command = "";
                        }
                    }
                }
                break;
            case "\u001b[D": // Left
                if (parseInt(`${command.length / 97}`) > 0) {
                    if (line - self.idx >= 0 && x === 0) {
                        self.term.write("\x1b[1A\x1b[100G");
                    } else {
                        self.term.write("\x1b[D");
                    }
                } else if (x > 4) {
                    self.term.write("\x1b[D");
                }
                break;
            case "\u001b[C": // Right
                if (parseInt(`${command.length / 97}`) > 0) {
                    if (x === 100) {
                        self.term.write("\x1b[1B\x1b[1G");
                    } else {
                        self.term.write("\x1b[C");
                    }
                } else {
                    self.term.write("\x1b[C");
                }
                break;
            case "\u007f": // DEL
                if (command?.length > 0) {
                    if (x >= 4) {
                        let k = command.split("").splice(x - 4, command.length);
                        command = command.split("").splice(0, x - 5).concat(k).join("");
                        self.term.write(`\x1b[2K\r>>> ${command}`);
                        if (k.length > 0) {
                            self.term.write(`\x1b[${k.length};D`);
                        }
                    }
                }
                break;
            case "\u001b[15;5~": // Ctrl+F5
            case "\u001b[15~": 
                location.reload();
                break;
            case "\u001b[23~": // F11
                let isFullscreen = () => !!document.fullscreenElement;
                if (isFullscreen()) {
                    if (document.exitFullscreen) {
                        document.exitFullscreen().resolve();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.webkitExitFullscreen) {
                        document.webkitExitFullscreen();
                    }
                } else {
                    if (document.documentElement.requestFullscreen) {
                        document.documentElement.requestFullscreen().resolve();
                    } else if (document.documentElement.mozRequestFullScreen) {
                        document.documentElement.mozRequestFullScreen();
                    } else if (document.documentElement.webkitRequestFullScreen) {
                        document.documentElement.webkitRequestFullScreen();
                    }
                }
                break;
            default:
                let cmd = command?.match(/(.{1,96})/g) || "";
                if (cmd?.length <= 1) {
                    pos = (x >= 0) ? (x - 4) : 0;
                } else {
                    pos = Math.abs(x);
                }
                if (key >= String.fromCharCode(0x20) && key <= String.fromCharCode(0x7E) || key >= "\u00a0") {
                    wrapText(key, pos, line, cmd);
                }
                break;
        }
    });
}

function Term() {
    useEffect(() => {
        /**
         * The `useEffect` hook tells React that the component needs to do something after render
         * and will call the component later after performing the DOM updates.
         * With an empty array here this will run only once and not on every render.
         *
         * @default void
         */
        initialize().then(null);
    }, []);
    bind();
}

export default Term;