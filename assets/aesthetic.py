"""
This module provides functions to create an aesthetic Scalable Vector Graphics avatar.
"""

from bz2 import decompress
from functools import lru_cache
from hashlib import blake2b
from pathlib import Path
from pickle import loads
from platform import uname
from random import choices, sample, shuffle
from tempfile import gettempdir
from typing import Iterator, NoReturn, Union
from xml.etree.ElementTree import fromstring, tostring, ElementTree

if "emscripten" in getattr(uname(), "system", "").casefold():  # At runtime
    FILE = (__file__ := "/home/pyodide/") + "final.bz2"

    def __rgb_decode(nio: str) -> list:
        """
        Decoding RGB codegolf bytes knowing it may have similar sizes with Brotli | Huffman coding.
        .. note::
            Slower results from literal_eval() without importing in pure-Python.
        """
        k = list(map(ord, nio))
        return [
            [f"#{bytes(k[j:j + 3]).hex()}" for j in range(i, i + 15, 3)]
            for i in range(0, len(k), 15)
        ]

try:
    p = (Path(__file__).parent / f"{FILE if 'FILE' in globals() else 'final.bz2'}").read_bytes()  # hexdigest
    values, colors = loads(decompress(b"BZh" + p.split(b"BZh")[1])), loads(decompress(b"BZh" + p.split(b"BZh")[2]))
except (FileNotFoundError, OSError, PermissionError, SyntaxError, TypeError, ValueError) as e:
    raise e from e


def demo(final: bytes) -> str:
    """
    Creation of an avatar file in the temporary folder.
    """
    try:
        filename = f"{gettempdir()}/{blake2b(final).hexdigest()}.svg"
        with open(filename, "wb") as fio:
            fio.write(final)
        return filename
    except (AttributeError, NameError, PermissionError, TypeError) as err:
        raise err from err


def make() -> Union[bool, bytes, str, None]:
    """
    Checks if the XML-based vector image format graphics is created.
    """
    try:
        ska = Scalable()
        shuffle(values)  # `shuffle` will be removed in version 3.11
        res = choices(values)[0]
        tree = ElementTree(fromstring(ska.svg)).getroot()  # No namespaces
        for idx, k in enumerate(tree.findall(
                "{http://www.w3.org/2000/svg}defs/{http://www.w3.org/2000/svg}g/"
                "{http://www.w3.org/2000/svg}path")):
            k.attrib["fill"], k.attrib["d"] = ska.fill(), res[idx]
        return tostring(tree, encoding="utf-8").replace(b"ns0:", b"").replace(b":ns0", b"").replace(b'" />', b'"/>')
    except (AssertionError, IndexError, KeyError, RecursionError, TypeError, ValueError):
        return False


class Scalable:
    """
    Generating artistic square Scalable Vector Graphics avatar.
    """

    def __repr__(self):
        return repr(self)

    def __init__(self):
        self.svg = "".join(('<svg shape-rendering="crispEdges" version="1.1" width="320" height="320" ',
                            'xmlns="http://www.w3.org/2000/svg" xmlns:n="http://www.w3.org/1999/xlink">',
                            '\n  <title>Right_click_to_save_as</title>\n', f'{"<defs>":>8}\n',
                            f"""{"<g id='s'>":>14}\n""", f'''{f"""{'<path fill="" d=""/>':>26}{chr(10)}""" * 32}''',
                            f'{"</g>":>8}\n', f'{"</defs>":>9}\n', f"""{"<use n:href='#s'/>":>20}\n""",
                            "  <use n:href='#s' transform='matrix(1 0 0 -1 0 320)'/>\n",
                            "  <use n:href='#s' transform='matrix(-1 0 0 1 320 0)'/>\n",
                            "  <use n:href='#s' transform='rotate(180 160 160)'/>\n</svg>"))
        self.out = self.generate(32, choices([4, 5], weights=[.2, .8], k=1)[0])  # Applicable with Numpy, Numba

    @staticmethod
    def accelerate_asc(nio: int) -> Iterator[list]:
        """
        Redistribution of lists to balance non-proportional values, similar to the Voronoi diagram.
        :long_url: https://en.wikipedia.org/wiki/Tessellation
        """
        zio = [0] * (nio + 1)
        k = 1
        yio = nio - 1
        while k != 0:
            xio = zio[k - 1] + 1
            k -= 1
            while 2 * xio <= yio:
                zio[k] = xio
                yio -= xio
                k += 1
            tio = k + 1
            while xio <= yio:
                zio[k] = xio
                zio[tio] = yio
                yield zio[:k + 2]
                xio += 1
                yio -= 1
            zio[k] = xio + yio
            yio = xio + yio - 1
            yield zio[:k + 1]

    @lru_cache(0)
    def generate(self, total: int, nio: int) -> dict:
        """
        A palette of color combinations that tends to be aesthetically pleasing.
        :long_url: https://en.wikipedia.org/wiki/Harmony_(color)
        :rtype: dict
        """
        parts: Iterator[list] = self.accelerate_asc(total)
        output = [partition for partition in parts if len(partition) == nio and 1 not in partition]
        rio = choices(output)[0]
        shuffle(rio)
        _ = self.generate(total, nio) if not all(_ <= 17 for _ in rio) else False  # Heterogeneity
        assert sum(rio) == total, print("Different sizes")
        assert not nio >= 6, print("Too big for colors")
        shuffle(colors)
        return dict(zip(choices(colors)[0], rio))

    def fill(self) -> str:
        """
        Manipulating dictionary of color strings with their respective amounts.
        :rtype: str
        """
        assert self.out, print("Sample is negative")
        rio = sample(list(self.out.items()), 1)[0][0]
        dio = {k: v - 1 if k == rio else self.out[k] for k, v in self.out.items()}
        self.out = {k: v for k, v in dio.items() if v}
        return rio


class ReaderPNG:
    """This class provides methods to read simple PNG avatars."""

    def __init__(self, file=None):
        self.file = __import__("io").BytesIO(file)
        self.signature = self.transparent = self.atchunk = self.compression = None
        self.height = self.bitdepth = self.color_type = self.trns = self.gamma = None
        self.filter = self.colormap = self.greyscale = self.alpha = None
        self.color_planes = self.planes = self.psize = self.plte = self.sbit = None
        self.interlace = self.row_bytes = self.width = self.background = 0
        self.phys = self.x_pixels_per_unit = self.y_pixels_per_unit = self.unit_is_meter = 0

    def chunk(self):
        self.validate_signature()
        if not self.atchunk:
            self.atchunk = self._chunk_len_type()
        if not self.atchunk:
            return b"IEND", 0
        length, tag = self.atchunk
        self.atchunk = None
        data = self.file.read(length)
        _ = self.file.read(4)
        return tag, data

    def chunks(self):
        while True:
            t, v = self.chunk()
            yield t, v
            if t == b"IEND" or t is None:
                break

    def undo_filter(self, flt, scanline, previous):
        result = scanline
        if flt == 0:
            return result
        if flt not in (1, 2, 3, 4):
            Exception("Invalid PNG filter type.")
        fu = max(1, self.psize)
        if not previous:
            previous = bytearray([0] * len(scanline))
        fn = (None, self.undo_filter_sub, self.undo_filter_up, self.undo_filter_average, self.undo_filter_paeth)[flt]
        fn(fu, scanline, previous, result)
        return result

    def _iter_bytes_to_values(self, byte_rows):
        for row in byte_rows:
            yield self._bytes_to_values(row)

    def _bytes_to_values(self, bs, width=None):
        if self.bitdepth == 8:
            return bytearray(bs)
        if self.bitdepth == 16:
            return [int.from_bytes((chr(pn) + chr(bs[1::2][i])).encode(), "big") for i, pn in enumerate(bs[::2])]

        assert self.bitdepth < 8
        if width is None:
            width = self.width
        spb = 8 // self.bitdepth
        out = bytearray()
        mask = 2 ** self.bitdepth - 1
        shifts = [self.bitdepth * i for i in reversed(list(range(spb)))]
        for o in bs:
            out.extend([mask & (o >> i) for i in shifts])
        return out[:width]

    def _iter_straight_packed(self, byte_blocks):
        rb = self.row_bytes
        a = bytearray()
        recon = None
        for some_bytes in byte_blocks:
            a.extend(some_bytes)
            while len(a) >= rb + 1:
                filter_type = a[0]
                scanline = a[1:rb + 1]
                del a[:rb + 1]
                recon = self.undo_filter(filter_type, scanline, recon)
                yield recon
        if len(a) != 0:
            raise Exception("Wrong size for decompressed IDAT chunk.")
        assert len(a) == 0

    def validate_signature(self):
        if self.signature:
            return
        self.signature = self.file.read(8)
        if len(self.signature) == 0:
            raise EOFError("End of PNG stream.")
        if self.signature != b"\x89PNG\r\n\x1a\n":
            raise Exception("PNG file has an invalid signature.")

    def preamble(self):
        self.validate_signature()
        while True:
            if not self.atchunk:
                self.atchunk = self._chunk_len_type()
                if self.atchunk is None:
                    break
            if self.atchunk[1] == b"IDAT":
                return
            self.process_chunk()

    def _chunk_len_type(self):
        x = self.file.read(8)
        if not x:
            return None
        if len(x) != 8:
            raise Exception("End of file whilst reading chunk length/type.")
        length = int.from_bytes(x[2:4], "big")
        tag = x[4:]
        if length > 2 ** 31 - 1:
            raise Exception(f"Chunk {tag} is too large: {length}.")

        type_bytes = set(bytearray(tag))
        if not type_bytes <= set(range(65, 91)) | set(range(97, 123)):
            raise Exception(f"Chunk {list(tag)} has an invalid chunk type.")
        return length, tag

    def process_chunk(self) -> NoReturn:
        tag, data = self.chunk()
        method = getattr(self, f"_process_{tag.decode()}", None)
        if callable(method):
            method(data)

    def _process_IHDR(self, data) -> NoReturn:
        if len(data) != 13:
            raise Exception("IHDR chunk has incorrect length.")
        self.width = int.from_bytes(data[2:4], "big")
        self.height = int.from_bytes(data[5:8], "big")
        self.bitdepth = int.from_bytes(data[8:9], "big")
        self.color_type = int.from_bytes(data[9:10], "big")
        self.compression = int.from_bytes(data[10:11], "big")
        self.filter = int.from_bytes(data[11:12], "big")
        self.interlace = int.from_bytes(data[12:13], "big") * 0  # None
        colormap = bool(self.color_type & 1)
        greyscale = not self.color_type & 2
        alpha = bool(self.color_type & 4)
        color_planes = (3, 1)[greyscale or colormap]
        planes = color_planes + alpha
        self.colormap = colormap
        self.greyscale = greyscale
        self.alpha = alpha
        self.color_planes = color_planes
        self.planes = planes
        self.psize = float(self.bitdepth) / float(8) * planes
        self.psize = int(self.psize) if int(self.psize) == self.psize else self.psize
        self.row_bytes = int(-(-self.width * self.psize))

    def _process_PLTE(self, data) -> NoReturn:
        if self.plte:
            Exception("Multiple PLTE chunks present.")
        self.plte = data
        if len(data) % 3 != 0:
            raise Exception("PLTE chunk's length should be a multiple of 3.")
        if len(data) > (2 ** self.bitdepth) * 3:
            raise Exception("PLTE chunk is too long.")
        if len(data) == 0:
            raise Exception("Empty PLTE is not allowed.")

    def _process_bKGD(self, data) -> NoReturn:
        try:
            if self.colormap:
                if not self.plte:
                    Exception("PLTE chunk is required before bKGD chunk.")
                self.background = int.from_bytes(data, "big")
            else:
                n = int.from_bytes(data[1::2], "big")
                r, g, b = (n >> 16) & 255, (n >> 8) & 255, n & 255
                self.background = (r, g, b)
        except Exception as er:
            raise er

    def _process_tRNS(self, data) -> NoReturn:
        self.trns = data
        if self.colormap:
            if not self.plte:
                raise Exception("PLTE chunk is required before tRNS chunk.")
            if len(data) > len(self.plte) / 3:
                raise Exception("tRNS chunk is too long.")
        else:
            if self.alpha:
                raise Exception(f"tRNS chunk is not valid with colour type {self.color_type}.")
            try:
                self.transparent = int.from_bytes(data[1::2], "big")
            except Exception as exc:
                raise exc

    def _process_gAMA(self, data) -> NoReturn:
        try:
            self.gamma = int.from_bytes(data, "big") / 100000.0
        except Exception as exc:
            raise exc

    def _process_sBIT(self, data) -> NoReturn:
        self.sbit = data
        if self.colormap and len(data) != 3 or not self.colormap and len(data) != self.planes:
            raise Exception("sBIT chunk has incorrect length.")

    def _process_pHYs(self, data) -> NoReturn:
        self.phys = data
        if len(data) != 9:
            raise Exception("pHYs chunk has incorrect length.")
        self.x_pixels_per_unit, self.y_pixels_per_unit, unit = data[3], data[7], data[8]
        self.unit_is_meter = bool(unit)

    @staticmethod
    def dec(data):  # For Zlib decompression
        r = BitReader(data)
        _ = [r.read_byte(), r.read_byte()]
        out = r.inflate(r)
        return out

    def read(self):
        def iteridat():
            while True:  # Slower
                tag, data = self.chunk()
                if tag == b"IEND":
                    break
                if tag != b"IDAT":
                    continue
                if self.colormap and not self.plte:
                    Exception("PLTE chunk is required before IDAT chunk")
                yield data

        self.preamble()
        rows = self._iter_bytes_to_values(self._iter_straight_packed([self.dec(data) for data in iteridat()]))
        info = {}
        for attr in ["greyscale", "alpha", "planes", "bitdepth", "interlace"]:
            info[attr] = getattr(self, attr)
        info["size"] = (self.width, self.height)
        for attr in ["gamma", "transparent", "background"]:
            k = getattr(self, attr, None)
            if k is not None:
                info[attr] = k
        if self.plte:
            info["palette"] = self.palette()
        return self.width, self.height, rows, info

    def palette(self):
        if not self.plte:
            raise Exception("Required PLTE chunk is missing in colour type 3 image.")
        return list(zip(*[iter(self.plte)] * 3))

    def as_direct(self):
        self.preamble()
        if not self.colormap and not self.trns and not self.sbit:
            return self.read()  # Simple case
        x, y, pixels, info = self.read()
        if self.colormap:
            info["colormap"] = False
            info["alpha"] = bool(self.trns)
            info["bitdepth"] = 8
            info["planes"] = 3 + bool(self.trns)
            plte = self.palette()

            def iterpal(pix):
                for row in pix:
                    row = [plte[z] for z in row]
                    k = [i for sub in list(zip(*row)) for i in sub]
                    yield k

            pixels = iterpal(pixels)
        targetbitdepth = None
        if self.sbit:
            sbit = tuple(b for b in self.sbit)
            targetbitdepth = max(sbit)
            if targetbitdepth > info["bitdepth"]:
                raise Exception(f"sBIT chunk {sbit} exceeds bitdepth {self.bitdepth}")
            if min(sbit) <= 0:
                raise Exception(f"sBIT chunk {sbit} has a zero-entry")
        if targetbitdepth:
            shift = info["bitdepth"] - targetbitdepth
            info["bitdepth"] = targetbitdepth

            def itershift(pxs):
                for row in pxs:
                    yield [p >> shift for p in row]

            pixels = itershift(pixels)
        return x, y, pixels, info

    @staticmethod
    def undo_filter_sub(filter_unit, scanline, _, result):
        ai = 0
        for i in range(filter_unit, len(result)):
            x = scanline[i]
            a = result[ai]
            result[i] = (x + a) & 0xff
            ai += 1

    @staticmethod
    def undo_filter_up(_, scanline, previous, result):
        for i, _ in enumerate(result):
            x = scanline[i]
            b = previous[i]
            result[i] = (x + b) & 0xff

    @staticmethod
    def undo_filter_average(filter_unit, scanline, previous, result):
        ai = -filter_unit
        for i, _ in enumerate(result):
            x = scanline[i]
            if ai < 0:
                a = 0
            else:
                a = result[ai]
            b = previous[i]
            result[i] = (x + ((a + b) >> 1)) & 0xff
            ai += 1

    @staticmethod
    def undo_filter_paeth(filter_unit, scanline, previous, result):
        ai = -filter_unit
        for i, _ in enumerate(result):
            x = scanline[i]
            if ai < 0:
                a = c = 0
            else:
                a = result[ai]
                c = previous[ai]
            b = previous[i]
            p = a + b - c
            pa = abs(p - a)
            pb = abs(p - b)
            pc = abs(p - c)
            if pa <= pb and pa <= pc:
                pr = a
            elif pb <= pc:
                pr = b
            else:
                pr = c
            result[i] = (x + pr) & 0xff
            ai += 1


class BitReader:
    def __init__(self, mem=None):
        self.mem = mem
        self.pos = 0
        self.b = 0
        self.numbits = 0
        self.root = type("Node", (object,), {"symbol": "", "left": None, "right": None})()
        self.root.symbol = ""

    def insert(self, codeword, n, symbol):
        node = self.root
        for i in range(n - 1, -1, -1):
            b = codeword & (1 << i)
            if b:
                next_node = node.right
                if next_node is None:
                    node.right = type("Node", (object,), {"symbol": "", "left": None, "right": None})()
                    next_node = node.right
            else:
                next_node = node.left
                if next_node is None:
                    node.left = type("Node", (object,), {"symbol": "", "left": None, "right": None})()
                    next_node = node.left
            node = next_node
        node.symbol = symbol

    def read_byte(self):
        self.numbits = 0
        b = self.mem[self.pos]
        self.pos += 1
        return b

    def read_bit(self):
        if self.numbits <= 0:
            self.b = self.read_byte()
            self.numbits = 8
        self.numbits -= 1
        bit = self.b & 1
        self.b >>= 1
        return bit

    def read_bits(self, n):
        o = 0
        for i in range(n):
            o |= self.read_bit() << i
        return o

    def inflate_block_dynamic(self, r, o):
        literal_length_tree, distance_tree = self.decode_trees(r)
        self.inflate_block_data(r, literal_length_tree, distance_tree, o)

    def inflate_block_fixed(self, r, o):
        bl = ([8 for _ in range(144)] + [9 for _ in range(144, 256)] +
              [7 for _ in range(256, 280)] + [8 for _ in range(280, 288)])
        literal_length_tree = self.bl_list_to_tree(bl, range(286))
        bl = [5 for _ in range(30)]
        distance_tree = self.bl_list_to_tree(bl, range(30))
        self.inflate_block_data(r, literal_length_tree, distance_tree, o)

    def inflate(self, r):
        bfinal = 0
        out = []
        while not bfinal:
            bfinal = r.read_bit()
            btype = r.read_bits(2)
            if btype == 1:
                self.inflate_block_fixed(r, out)
            elif btype == 2:
                self.inflate_block_dynamic(r, out)
            else:
                raise Exception("invalid btype")
        return bytes(out)

    def decode_trees(self, r):
        hlit = r.read_bits(5) + 257
        hdist = r.read_bits(5) + 1
        hclen = r.read_bits(4) + 4
        code_length_tree_bl = [0 for _ in range(19)]
        for i in range(hclen):
            code_length_tree_bl[[16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15][i]] = r.read_bits(3)
        code_length_tree = self.bl_list_to_tree(code_length_tree_bl, range(19))
        bl = []
        while len(bl) < hlit + hdist:
            sym = self.decode_symbol(r, code_length_tree)
            if 0 <= sym <= 15:
                bl.append(sym)
            elif sym == 16:
                prev_code_length = bl[-1]
                repeat_length = r.read_bits(2) + 3
                bl.extend(prev_code_length for _ in range(repeat_length))
            elif sym == 17:
                repeat_length = r.read_bits(3) + 3
                bl.extend(0 for _ in range(repeat_length))
            elif sym == 18:
                repeat_length = r.read_bits(7) + 11
                bl.extend(0 for _ in range(repeat_length))
            else:
                raise Exception("invalid symbol")

        literal_length_tree = self.bl_list_to_tree(bl[:hlit], range(286))
        distance_tree = self.bl_list_to_tree(bl[hlit:], range(30))
        return literal_length_tree, distance_tree

    @staticmethod
    def bl_list_to_tree(bl, alphabet):
        bl_count = [sum(1 for x in bl if x == y and y != 0) for y in range(max(bl) + 1)]
        next_code = [0, 0]
        for bits in range(2, max(bl) + 1):
            next_code.append((next_code[bits - 1] + bl_count[bits - 1]) << 1)
        t = BitReader()  # super()
        for c, bitlen in zip(alphabet, bl):
            if bitlen != 0:
                t.insert(next_code[bitlen], bitlen, c)
                next_code[bitlen] += 1
        return t

    @staticmethod
    def decode_symbol(r, t):
        node = t.root
        while node.left or node.right:
            b = r.read_bit()
            node = node.right if b else node.left
        return node.symbol

    def inflate_block_data(self, r, literal_length_tree, distance_tree, out):
        while True:
            sym = self.decode_symbol(r, literal_length_tree)  # Recursionlimit
            if sym <= 255:
                out.append(sym)
            elif sym == 256:
                return
            else:
                sym -= 257
                length = r.read_bits(([0] * 8 + [1] * 4 + [2] * 4 + [3] * 4 + [4] * 4 + [5] * 4 + [0])[sym]) + (list(range(3, 12)) + [13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258])[sym]
                dist_sym = self.decode_symbol(r, distance_tree)
                dist = r.read_bits((2 * [0] + [i for i in range(14) for _ in range(2)])[dist_sym]) + [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577][dist_sym]
                _ = [out.append(out[-dist]) for _ in range(length)]


def open_composite(data=None):
    w, _, pixel, info = ReaderPNG(file=data).as_direct()
    png = []
    for row in pixel:
        n = iter(list(row)[:])
        png += list(zip(n, n, n, n)) if info["alpha"] else list(zip(n, n, n))
    return w, png


def start(p=None):
    m = open_composite(data=__import__("base64").b64decode(p))
    x = ["\x00" * 3, "\x80\x00\x00", "\x00\x80\x00", "\x80\x80\x00", "\x00\x00\x80", "\x80\x00\x80",
         "\x00\x80\x80", "À" * 3, "\x80" * 3, "ÿ\x00\x00", "\x00ÿ\x00", "ÿÿ\x00", "\x00\x00ÿ", "ÿ\x00ÿ",
         "\x00ÿÿ", "ÿ" * 3, "\x00" * 3, "\x00\x00_", "\x00\x00\x87", "\x00\x00¯", "\x00\x00×",
         "\x00\x00ÿ", "\x00_\x00", "\x00__", "\x00_\x87", "\x00_¯", "\x00_×", "\x00_ÿ", "\x00\x87\x00",
         "\x00\x87_", "\x00\x87\x87", "\x00\x87¯", "\x00\x87×", "\x00\x87ÿ", "\x00¯\x00", "\x00¯_",
         "\x00¯\x87", "\x00¯¯", "\x00¯×", "\x00¯ÿ", "\x00×\x00", "\x00×_", "\x00×\x87", "\x00×¯",
         "\x00××", "\x00×ÿ", "\x00ÿ\x00", "\x00ÿ_", "\x00ÿ\x87", "\x00ÿ¯", "\x00ÿ×", "\x00ÿÿ",
         "_\x00\x00", "_\x00_", "_\x00\x87", "_\x00¯", "_\x00×", "_\x00ÿ", "__\x00", "_" * 3, "__\x87",
         "__¯", "__×", "__ÿ", "_\x87\x00", "_\x87_", "_\x87\x87", "_\x87¯", "_\x87×", "_\x87ÿ",
         "_¯\x00", "_¯_", "_¯\x87", "_¯¯", "_¯×", "_¯ÿ", "_×\x00", "_×_", "_×\x87", "_×¯", "_××", "_×ÿ",
         "_ÿ\x00", "_ÿ_", "_ÿ\x87", "_ÿ¯", "_ÿ×", "_ÿÿ", "\x87\x00\x00", "\x87\x00_", "\x87\x00\x87",
         "\x87\x00¯", "\x87\x00×", "\x87\x00ÿ", "\x87_\x00", "\x87__", "\x87_\x87", "\x87_¯", "\x87_×",
         "\x87_ÿ", "\x87\x87\x00", "\x87\x87_", "\x87" * 3, "\x87\x87¯", "\x87\x87×", "\x87\x87ÿ",
         "\x87¯\x00", "\x87¯_", "\x87¯\x87", "\x87¯¯", "\x87¯×", "\x87¯ÿ", "\x87×\x00", "\x87×_",
         "\x87×\x87", "\x87×¯", "\x87××", "\x87×ÿ", "\x87ÿ\x00", "\x87ÿ_", "\x87ÿ\x87", "\x87ÿ¯",
         "\x87ÿ×", "\x87ÿÿ", "¯\x00\x00", "¯\x00_", "¯\x00\x87", "¯\x00¯", "¯\x00×", "¯\x00ÿ", "¯_\x00",
         "¯__", "¯_\x87", "¯_¯", "¯_×", "¯_ÿ", "¯\x87\x00", "¯\x87_", "¯\x87\x87", "¯\x87¯", "¯\x87×",
         "¯\x87ÿ", "¯¯\x00", "¯¯_", "¯¯\x87", "¯" * 3, "¯¯×", "¯¯ÿ", "¯×\x00", "¯×_", "¯×\x87", "¯×¯",
         "¯××", "¯×ÿ", "¯ÿ\x00", "¯ÿ_", "¯ÿ\x87", "¯ÿ¯", "¯ÿ×", "¯ÿÿ", "×\x00\x00", "×\x00_",
         "×\x00\x87", "×\x00¯", "×\x00×", "×\x00ÿ", "×_\x00", "×__", "×_\x87", "×_¯", "×_×", "×_ÿ",
         "×\x87\x00", "×\x87_", "×\x87\x87", "×\x87¯", "×\x87×", "×\x87ÿ", "×¯\x00", "×¯_", "×¯\x87",
         "×¯¯", "×¯×", "×¯ÿ", "××\x00", "××_", "××\x87", "××¯", "×" * 3, "××ÿ", "×ÿ\x00", "×ÿ_",
         "×ÿ\x87", "×ÿ¯", "×ÿ×", "×ÿÿ", "ÿ\x00\x00", "ÿ\x00_", "ÿ\x00\x87", "ÿ\x00¯", "ÿ\x00×",
         "ÿ\x00ÿ", "ÿ_\x00", "ÿ__", "ÿ_\x87", "ÿ_¯", "ÿ_×", "ÿ_ÿ", "ÿ\x87\x00", "ÿ\x87_", "ÿ\x87\x87",
         "ÿ\x87¯", "ÿ\x87×", "ÿ\x87ÿ", "ÿ¯\x00", "ÿ¯_", "ÿ¯\x87", "ÿ¯¯", "ÿ¯×", "ÿ¯ÿ", "ÿ×\x00", "ÿ×_",
         "ÿ×\x87", "ÿ×¯", "ÿ××", "ÿ×ÿ", "ÿÿ\x00", "ÿÿ_", "ÿÿ\x87", "ÿÿ¯", "ÿÿ×", "ÿ" * 3, "\x08" * 3,
         "\x12" * 3, "\x1c" * 3, "&" * 3, "0" * 3, ":" * 3, "D" * 3, "N" * 3, "X" * 3, "b" * 3, "l" * 3,
         "v" * 3, "\x80" * 3, "\x8a" * 3, "\x94" * 3, "\x9e" * 3, "¨" * 3, "²" * 3, "¼" * 3, "Æ" * 3,
         "Ð" * 3, "Ú" * 3, "ä" * 3, "î" * 3]
    L = list(zip(x, [k for k in [f"0{i}" if i < 10 else str(i) for i in range(256)]]))
    res, s = ["00"] * 48 + ["5f"] * 67 + ["87"] * 40 + ["af"] * 40 + ["d7"] * 40 + ["ff"] * 21, []
    _ = [[s.append("\x1b[0m\n") if (i + 1) % m[0] == 0 else 0 for _ in [s.append(
        f'\x1b[48;5;{dict(L)["".join([chr(i) for i in tuple(int(f"{res[p[0]]}{res[p[1]]}{res[p[2]]}"[i:i + 2], 16) for i in (0, 2, 4))])]}m  ')]]
         for i, p in enumerate(list(m[1]))]
    return "".join(s).strip()  # Transforming PNG into RGB-alpha ANSI composite


if __name__ == "__main__":
    _ = (print(demo(_)) if (_ := make()) else _)
