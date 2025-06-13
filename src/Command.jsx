import {generation} from "./Term.jsx";
import {LinkProvider} from "xterm-link-provider";
import i18next from "./I18n.jsx";


const commands = {
    /**
     * This `object` stores different commands that can be used in the `Terminal` with `Pyodide`.
     * You can assign variables with the same name as the commands below with `eval` function.
     *
     * @default object
     */
    audio: {
        f: () => {
            self.term.write(`\x07\n🔊\n>>> `);
        },
        description: () => i18next?.t("help.audio")
    },
    cat: {
        f: (command) => {
            const cat = command?.match(/^cat\s+(.+)$/) || ["cat", "."];
            if (self.pyodide) {
                self.term.runPythonCode(`cat = __import__("pathlib").Path("${cat[1]}"); txt = cat.read_bytes() if cat.is_file() else "cat: No such file or directory"; txt`).then(null);
            } else {
                self.term.write("\ncat: No such file or directory\r\n>>> ");
            }
        },
        description: i18next?.t("help.cat")
    },
    cd: {
        f: (command) => {
            const cd = command?.match(/^cd\s+(.+)$/) || ["cd", "."];
            if (self.pyodide) {
                self.term.runPythonCode(`
                  try:
                    __import__("os").chdir("${cd[1]}")
                  except:
                    print("cd: No such file or directory")
                `).then(null);
            } else {
                self.term.write("\ncd: No such file or directory\r\n>>> ");
            }
        },
        description: i18next?.t("help.cd")
    },
    clear: {
        f: () => {
            self.term.clear();
            self.term.scrollToTop();
            self.term.write("\x1b[2K\r>>> ");
        },
        description: i18next?.t("help.clear")
    },
    cls: {
        f: () => {
            self.term.clear();
            self.term.scrollToTop();
            self.term.write("\x1b[2K\r>>> ");
        },
        description: i18next?.t("help.cls")
    },
    exit: {
        f: () => {
            window.localStorage.i18nextLng = "en";
            location.reload();
        },
        description: i18next?.t("help.exit")
    },
    gen: {
        f: () => {
            if (self.pyodide) {
                if (self.dataURL) {
                    self.term.runPythonCode(`svg = asc.start("${self.dataURL?.replace('data:image/png;base64,', '')}"); svg`).then(null);
                    if (self.img?.src) {
                        let img = self.img.src;
                        self.term.registerLinkProvider(new LinkProvider(term, new RegExp(`(${img})`, "gu"), (_, __) => {
                            window.open(img);
                        }));
                        self.term.writeln(`\x1b[2K\r>>> ${img}`);
                    } else {
                        self.term.write(`\n\x1b[31;1mTraceback (most recent call last):\n  File "<console>", line 1, in <module>\n\rNameError: name 'img' is not defined\x1b[m`);
                    }
                    generation().catch(console.error); // Sometimes wrong colors when CI/CD
                } else {
                    self.term.write(`\n\x1b[31;1mTraceback (most recent call last):\n  File "<console>", line 1, in <module>\n\rNameError: name 'svg' is not defined\x1b[m\r\n>>> `);
                }
            } else {
                function decompressLZ77(data) {
                    function decodeReferenceInt(data, width) {
                        let value = 0;
                        for (let i = 0; i < width; i++) {
                            value *= 96;
                            let charCode = data?.charCodeAt(i);
                            if ((charCode >= " ".charCodeAt(0)) && (charCode <= " ".charCodeAt(0) + 96 - 1)) {
                                value += charCode - " ".charCodeAt(0);
                            } else {
                                return;
                            }
                        }
                        return value;
                    }

                    let [decompressed, pos] = ["", 0];
                    while (pos < data?.length) {
                        if (data?.charAt(pos) !== "`") {
                            decompressed += data.charAt(pos);
                            pos++;
                        } else {
                            if (data?.charAt(pos + 1) !== "`") {
                                decompressed += decompressed.substring(decompressed.length - (decodeReferenceInt(data.substr(pos + 1, 2), 2)) - (decodeReferenceInt(data.charAt(pos + 3), 1) + 5), decompressed.length - (decodeReferenceInt(data.substr(pos + 1, 2), 2)));
                                pos += 5 - 1;
                            } else {
                                decompressed += "`";
                                pos += 2;
                            }
                        }
                    }
                    return decompressed;
                }
                const demoSVG = `Lls0ODs1OzIyMm0gIC5bNDg7NTsyMjJtICAuWzQ4OzU7MjIybSAgYCAmPDExNGAgVyUxMTRgIGQlMTFgICIzYCAlfmAhI1RgIGZ+YCIrYWAkUiMwbQpgI3dWYCQ4XDIwM2AkcX5gI2l+YCF8L2Amb1xgJ0hKYCRIP2AoNlxgJERDYCRTQWAoVX5gKnRIYCFqNGAiPHdgKS1GYCxgfmAkTDtgKVk0YC1BfmAvbTtgIVBBYC9rfmAuLTJgMXp
                QYCNkQmAmaE5gL31xYDRKfmAhe35gNmUyYCQ7TDJgI39aYChPXGAjaH5gK2FiYCI9XGAzT0hgKTI/YCRQKGAjcHRgM1NpYChRfmAybVRgJDZOYCRUPGAuJzJgJEI0YCNkfmA5SVpgLTt7YDw4T2Aje2dgKVQvYEE9JmAgM0pgI2J+YDFwfmAzInRgI2J+YDI8I2A3KVpgSG1+YDdKbWAgP35gIk9+YDZ4a2BNbnVgPEZcYD50amA9aWhgUX9DYDZlfmAiKn5gSDJ
                0YEtuamAlS3VgNmV+YElsfmBILnNgIGZ+YFglYmA3MlFgRGxcYDZcfmBceX5gSylzYCJdfWBdZDNgI1x+YDE4emBhZX5gXFRVYCdJcGBiQ0BgRF9+YGJxbWBmUX5gYkluYE1MV2BnI0xgRG5pYEFNfmA/PX5gayBnYE1FVmAkOk1gWzB+YG9vfmBwd35gXmJ+YChVfmAoVX5gdSJ+YChVfmAoVX5gMi1+YDItfmB5YX5gMi1+YDJNXmBARH5gO2V+YHlhfmA7ZX5
                gPDVOYEU9fmBudH5geWF+YF02fmBFYVpgTm9+YE5vfmBOb35geV5+YGcgVWBYPX5gWD1+YFg9fmBeYn5gcD9kYGFvfmBhb35gYW9+YGFvfmBmZHNga0V+YGtFfmBsZ35gbnd+YHR1fmB0dX5geWd+YHR1fmB0enlgeVp+YFtLbGBmZH5geVp+YDZlfmAoSX5gUVx+YHBVaGAoSX5gNmZ9YGthaGBqKX5gXmN+YC0+cmA2Z3xgcSBbYG50fmBxPn5gIXt+YDc5SmB
                jU35geihUYHR1fmAoPm1gIj1pYHcyPWBwaD9gQ1R2YDJYaWB5YX5geXFHYCI8d2BwR2BgdC9pYHVeaWB5YX5geXFHYHYlaWBwKX5gfGR+YHlhfmAgZn5gcF59MG0=`.trim(); // XSS
                const lz = decompressLZ77(window.atob(demoSVG))?.replace(/[.]/gm, "\x1b") || ""; // no URL here
                if (lz) {
                    self.term.write(`\n${lz}\n\r>>> `);
                }
            }
        },
        description: i18next?.t("help.gen")
    },
    help: {
        f: () => {
            self.term.write(`\n${i18next?.t("help.alpha")}:\n • ${Object.keys(commands)?.map((key) => `\x1b[1m${key}\x1b[0m => ${commands[key]?.description()}\n`)?.join(" • ")}\r>>> `);
        },
        description: () => i18next?.t("help.help")
    },
    lang: {
        f: (command) => {
            const lang = command?.match(/^lang\s+(.+)$/) || ["lang", "en"];
            if (self.pyodide) {
                i18next?.changeLanguage(`${lang[1]}`).then(() => {
                    self.term.write("\n🌐\n\r>>> ")
                });
            }
        },
        description: i18next?.t("help.lang")
    },
    lipsum: {
        f: () => {
            const lorem = ["Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                "Logoden biniou degemer mat an penn ar bed Kernev en boan Kerbabu Groe erc'h, ennon botez plad koumanant outo hon leue ha Gerveur goañv miliner. Gar degouezhout du stagañ flourañ nav vrec'h aotre dor, vrozh werenn miz rimiañ oskaleg an hanternoz fest ur labourat urzh.",
                "Pommy ipsum what a load of cobblers off the hook absolute twoddle scouser I'd reet fancy a, jolly have a butcher's at this the lakes it's me peepers warts and all, well chuffed football down the village green cor blimey' Northeners. A bottle of plonk as diamond geezer.",
                "Taboire de verrat d'estique de patente à gosse de torrieux de maudine d'ostie de câline de bine de cibole de saint-sacrament de bâtard de rigodon de crisse de boswell de cossin de crucifix."/* lorembarnak */];
            const item = lorem[Math.floor(Math.random() * lorem.length)];
            self.term.write(`\n${item}\r\n>>> `);
        },
        description: i18next?.t("help.lipsum")
    },
    ls: {
        f: (command) => {
            const ls = command?.match(/^ls\s+(.+)$/) || ["ls", "."];
            if (self.pyodide) {
                self.term.runPythonCode(`
                    try:
                      _, ls = f"""drwxr-xr-x 42 0 0 4096 {__import__('datetime').datetime.now().strftime('%b %d %Y')} .\ndrwxrwxrwx 42 0 0 4096 {__import__('datetime').datetime.now().strftime('%b %d %Y')} ..""", __import__("pathlib").Path("${ls[1]}")
                      if ls.is_file():
                        _ += f"""\n-rw-r--r--  1 {ls.stat().st_uid} {ls.stat().st_gid} {ls.stat().st_size} {__import__('datetime').datetime.fromtimestamp(ls.stat().st_mtime).strftime('%b %d %H:%M')} {ls.name}"""
                      elif ls.is_dir():
                        for path in ls.rglob('*'): _ += f"""\n-rw-r--r--  1 {path.stat().st_uid} {path.stat().st_gid} {path.stat().st_size} {__import__('datetime').datetime.fromtimestamp(path.stat().st_mtime).strftime('%b %d %H:%M')} {str(path)}"""
                    except: pass
                    _`.replace(/ {20}/g, "")
                ).then(null);
            } else {
                const date = `${new Date()?.toLocaleString("default", {month: "short"})} ${new Date()?.getDate()} ${new Date()?.getUTCFullYear()}` || "Jan 19 2038";
                self.term.write(`\ndrwxr-xr-x 42 0 0 4096 ${date} .\ndrwxrwxrwx 42 0 0 4096 ${date} ..\n\r>>> `);
            }
        },
        description: i18next?.t("help.ls")
    },
    mode: {
        f: () => {
            if (!self.isMode) {
                document.body.style.backgroundColor = "#FFF";
                document.querySelector(".xterm-viewport").style.backgroundColor = "rgb(255, 255, 255)";
                document.querySelector(".xterm-screen").style = "-webkit-filter: invert(100%); filter: invert(100%);";
                self.isMode = true; // self.term._core._themeService.colors.background
                self.term.write("\n🎨\n\r>>> ");
            } else {
                document.body.removeAttribute("style");
                document.querySelector(".xterm-viewport").removeAttribute("style");
                document.querySelector(".xterm-screen").removeAttribute("style");
                self.isMode = false;
                self.term.write("\n🖌️\n\r>>> ");
            }
        },
        description: i18next?.t("help.mode")
    },
    quit: {
        f: () => {
            location.reload();
        },
        description: i18next?.t("help.quit")
    },
    reboot: {
        f: () => {
            location.reload();
        },
        description: i18next?.t("help.reboot")
    },
    version: {
        f: () => {
            if (self.pyodide) {
                self.term.runPythonCode(`f'Python {__import__("sys").version} on {__import__("sys").platform}\\nType "help", "copyright", "credits" or "license" for more information.'`).then(null);
            } else {
                self.term.write('\nPython 3.11.2 (main, May  3 2023, 04:00:05) [Clang 17.0.0 (https://github.com/llvm/llvm-project df82394e7a2d06506718cafa347b on emscripten\nType "help", "copyright", "credits" or "license" for more information.\n\r>>> ');
            }
        },
        description: i18next?.t("help.version")
    }
};

export default commands;
