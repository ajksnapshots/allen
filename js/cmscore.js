var xt = Object.defineProperty;
var Ct = (n,t,e)=>t in n ? xt(n, t, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: e
}) : n[t] = e;
var nt = (n,t,e)=>(Ct(n, typeof t != "symbol" ? t + "" : t, e),
e);
var At = "1.13.0";
var A = class {
    static activateAlerts() {
        this.alertsActivated = !0
    }
    static alert(t, e) {
        if (this.alertsActivated && window.alert(t),
        e === "error")
            throw new Error(t)
    }
}
;
nt(A, "alertsActivated", !1);
var O = (n,t)=>!!n && t.includes(n);
var q = n=>n != null;
var B = n=>typeof n == "number";
var ot = {
    wrapper: "w-dyn-list",
    list: "w-dyn-items",
    item: "w-dyn-item",
    paginationWrapper: "w-pagination-wrapper",
    paginationNext: "w-pagination-next",
    paginationPrevious: "w-pagination-previous",
    pageCount: "w-page-count",
    emptyState: "w-dyn-empty"
};
var K = (n,t=!0)=>n.cloneNode(t);
var Q = n=>{
    let t = n.split("-")
      , e = parseInt(t[t.length - 1]);
    if (!isNaN(e))
        return e
}
;
var z = n=>Object.keys(n);
var G = n=>new Promise(t=>setTimeout(t, n));
var X = (n=document)=>{
    var e;
    let t = "Last Published:";
    for (let o of n.childNodes)
        if (o.nodeType === Node.COMMENT_NODE && ((e = o.textContent) != null && e.includes(t))) {
            let r = o.textContent.trim().split(t)[1];
            if (r)
                return new Date(r)
        }
}
;
var P = (n=document)=>n.documentElement.getAttribute("data-wf-site");
var W = async n=>{
    var e, o;
    let {Webflow: t} = window;
    if (!(!t || !("destroy"in t) || !("ready"in t) || !("require"in t)) && !(n && !n.length)) {
        if (n || (t.destroy(),
        t.ready()),
        !n || n.includes("ix2")) {
            let r = t.require("ix2");
            if (r) {
                let {store: i, actions: s} = r
                  , {eventState: a} = i.getState().ixSession
                  , c = Object.entries(a);
                n || r.destroy(),
                r.init(),
                await Promise.all(c.map(l=>i.dispatch(s.eventStateChanged(...l))))
            }
        }
        if (!n || n.includes("commerce")) {
            let r = t.require("commerce")
              , i = P();
            r && i && (r.destroy(),
            r.init({
                siteId: i,
                apiUrl: "https://render.webflow.com"
            }))
        }
        if (n != null && n.includes("lightbox") && ((e = t.require("lightbox")) == null || e.ready()),
        n != null && n.includes("slider")) {
            let r = t.require("slider");
            r && (r.redraw(),
            r.ready())
        }
        return n != null && n.includes("tabs") && ((o = t.require("tabs")) == null || o.redraw()),
        new Promise(r=>t.push(()=>r(void 0)))
    }
}
;
var Pt = "fs-cms-element"
  , Lt = {
    wrapper: "wrapper",
    list: "list",
    item: "item",
    paginationWrapper: "pagination-wrapper",
    paginationNext: "pagination-next",
    paginationPrevious: "pagination-previous",
    pageCount: "page-count",
    emptyState: "empty"
}
  , E = n=>{
    let t = `.${ot[n]}`
      , e = `[${Pt}="${Lt[n]}"]`;
    return `:is(${t}, ${e})`
}
  , N = (n,t=document)=>{
    n = n.filter(i=>i);
    let e = n.join(", ") || E("wrapper");
    return [...t.querySelectorAll(e)].reduce((i,s)=>{
        if (!s)
            return i;
        let a = b(s, "wrapper");
        return !a || i.includes(a) || i.push(a),
        i
    }
    , [])
}
;
function b(n, t, e=document) {
    let o = typeof n == "string" ? e.querySelector(n) : n;
    if (!o)
        return;
    let r = o.closest(E("wrapper"));
    if (!r)
        return;
    let i = r.querySelector(E("list"));
    return t === "wrapper" ? r : t === "list" ? i : t === "items" ? [...(i == null ? void 0 : i.querySelectorAll(`:scope > ${E("item")}`)) || []] : t === "pageCount" ? r.querySelector(E("pageCount")) : t === "empty" ? r.querySelector(`:scope > ${E("emptyState")}`) : t === "pagination" ? r.querySelector(E("paginationWrapper")) : r.querySelector(E(t === "next" ? "paginationNext" : "paginationPrevious"))
}
var I = "pages"
  , Y = new Map
  , it = async(n,{cache: t=!0, cacheExternal: e, cacheKey: o, cacheVersion: r}={})=>{
    var i, s;
    try {
        let a = new URL(n,window.location.origin)
          , c = await Mt(a);
        if (c)
            return c;
        let l = P()
          , p = X()
          , u = l || o
          , m = (s = (i = p == null ? void 0 : p.getTime()) != null ? i : r) != null ? s : 1
          , d = u ? await _t(u, m) : null;
        if (!t || !d) {
            let {page: f} = await st(a);
            return f
        }
        let h = await Rt(d, a.href);
        if (h) {
            let f = J(h);
            return e && !at(f, l) && rt(d, a, l, e),
            f
        }
        return await rt(d, a, l, e)
    } catch {
        return null
    }
}
  , Mt = async n=>{
    let t = await Y.get(n.href);
    if (t)
        return J(t)
}
  , st = async n=>{
    let t = fetch(n.href).then(r=>r.text());
    Y.set(n.href, t);
    let e = await t;
    return {
        page: J(e),
        rawPage: e
    }
}
  , rt = async(n,t,e,o)=>{
    let {page: r, rawPage: i} = await st(t)
      , s = at(r, e);
    return !s && !o || (await Ot(n, t.href, i),
    s && Y.delete(t.href)),
    r
}
  , at = (n,t)=>{
    if (!t)
        return !1;
    let e = P(n);
    return e && e === t
}
  , J = n=>new DOMParser().parseFromString(n, "text/html")
  , _t = (n,t)=>new Promise(e=>{
    try {
        let o = window.indexedDB.open(n, t);
        o.onblocked = ()=>{
            e(null)
        }
        ,
        o.onupgradeneeded = ()=>{
            let r = o.result;
            r.objectStoreNames.contains(I) && r.deleteObjectStore(I),
            r.createObjectStore(I)
        }
        ,
        o.onerror = ()=>e(null),
        o.onsuccess = ()=>{
            let r = o.result;
            r.onversionchange = ()=>r.close(),
            e(r)
        }
    } catch {
        e(null)
    }
}
)
  , Rt = async(n,t)=>new Promise(e=>{
    let i = n.transaction(I).objectStore(I).get(t);
    i.onerror = ()=>e(null),
    i.onsuccess = ()=>e(i.result)
}
)
  , Ot = async(n,t,e)=>new Promise(o=>{
    let s = n.transaction(I, "readwrite").objectStore(I).put(e, t);
    s.onerror = ()=>o(),
    s.onsuccess = ()=>o()
}
);
var Z = (n,t)=>{
    let e = n.getAttribute(t);
    return e ? Q(e) : void 0
}
;
function ct(n) {
    return n == null ? void 0 : n.trim().toLowerCase()
}
var x = class {
    constructor(t, e, o) {
        this.element = t;
        this.list = e;
        this.staticIndex = o;
        this.props = {};
        this.valid = !0;
        var i;
        this.href = (i = t.querySelector("a")) == null ? void 0 : i.href,
        this.currentIndex = [...e.children].indexOf(t);
        let r = this.currentIndex >= 0;
        this.needsWebflowRestart = !r
    }
    collectProps({fieldKey: t, typeKey: e, rangeKey: o}) {
        let {element: r, props: i} = this
          , s = [...r.querySelectorAll(`[${t}]`)];
        for (let a of s) {
            let c = ct(a.getAttribute(t));
            if (!c)
                return;
            let {textContent: l, innerHTML: p} = a;
            if (!l)
                continue;
            let u = e ? a.getAttribute(e) : void 0
              , m = o ? a.getAttribute(o) : void 0;
            i[c] || (i[c] = {
                type: u,
                range: m,
                values: new Set,
                elements: new Map
            });
            let d = i[c]
              , {values: h, elements: g} = d;
            if (m === "from" || m === "to") {
                let f = [...h];
                f[m === "from" ? 0 : 1] = l,
                d.values = new Set(f)
            }
            h.add(l),
            g.has(l) || g.set(l, {
                element: a,
                originalHTML: p
            })
        }
    }
}
;
var S = new WeakMap
  , C = new WeakMap
  , T = new WeakMap;
var F = Symbol("anyProducer")
  , lt = Promise.resolve()
  , $ = Symbol("listenerAdded")
  , k = Symbol("listenerRemoved")
  , V = !1
  , tt = !1;
function L(n) {
    if (typeof n != "string" && typeof n != "symbol" && typeof n != "number")
        throw new TypeError("`eventName` must be a string, symbol, or number")
}
function j(n) {
    if (typeof n != "function")
        throw new TypeError("listener must be a function")
}
function M(n, t) {
    let e = C.get(n);
    if (e.has(t))
        return e.get(t)
}
function U(n, t) {
    let e = typeof t == "string" || typeof t == "symbol" || typeof t == "number" ? t : F
      , o = T.get(n);
    if (o.has(e))
        return o.get(e)
}
function Bt(n, t, e) {
    let o = T.get(n);
    if (o.has(t))
        for (let r of o.get(t))
            r.enqueue(e);
    if (o.has(F)) {
        let r = Promise.all([t, e]);
        for (let i of o.get(F))
            i.enqueue(r)
    }
}
function pt(n, t) {
    t = Array.isArray(t) ? t : [t];
    let e = !1
      , o = ()=>{}
      , r = []
      , i = {
        enqueue(s) {
            r.push(s),
            o()
        },
        finish() {
            e = !0,
            o()
        }
    };
    for (let s of t) {
        let a = U(n, s);
        a || (a = new Set,
        T.get(n).set(s, a)),
        a.add(i)
    }
    return {
        async next() {
            return r ? r.length === 0 ? e ? (r = void 0,
            this.next()) : (await new Promise(s=>{
                o = s
            }
            ),
            this.next()) : {
                done: !1,
                value: await r.shift()
            } : {
                done: !0
            }
        },
        async return(s) {
            r = void 0;
            for (let a of t) {
                let c = U(n, a);
                c && (c.delete(i),
                c.size === 0 && T.get(n).delete(a))
            }
            return o(),
            arguments.length > 0 ? {
                done: !0,
                value: await s
            } : {
                done: !0
            }
        },
        [Symbol.asyncIterator]() {
            return this
        }
    }
}
function ut(n) {
    if (n === void 0)
        return mt;
    if (!Array.isArray(n))
        throw new TypeError("`methodNames` must be an array of strings");
    for (let t of n)
        if (!mt.includes(t))
            throw typeof t != "string" ? new TypeError("`methodNames` element must be a string") : new Error(`${t} is not Emittery method`);
    return n
}
var _ = n=>n === $ || n === k;
function H(n, t, e) {
    if (_(t))
        try {
            V = !0,
            n.emit(t, e)
        } finally {
            V = !1
        }
}
var y = class {
    static mixin(t, e) {
        return e = ut(e),
        o=>{
            if (typeof o != "function")
                throw new TypeError("`target` must be function");
            for (let s of e)
                if (o.prototype[s] !== void 0)
                    throw new Error(`The property \`${s}\` already exists on \`target\``);
            function r() {
                return Object.defineProperty(this, t, {
                    enumerable: !1,
                    value: new y
                }),
                this[t]
            }
            Object.defineProperty(o.prototype, t, {
                enumerable: !1,
                get: r
            });
            let i = s=>function(...a) {
                return this[t][s](...a)
            }
            ;
            for (let s of e)
                Object.defineProperty(o.prototype, s, {
                    enumerable: !1,
                    value: i(s)
                });
            return o
        }
    }
    static get isDebugEnabled() {
        var e, o;
        if (typeof ((e = globalThis.process) == null ? void 0 : e.env) != "object")
            return tt;
        let {env: t} = (o = globalThis.process) != null ? o : {
            env: {}
        };
        return t.DEBUG === "emittery" || t.DEBUG === "*" || tt
    }
    static set isDebugEnabled(t) {
        tt = t
    }
    constructor(t={}) {
        var e;
        S.set(this, new Set),
        C.set(this, new Map),
        T.set(this, new Map),
        T.get(this).set(F, new Set),
        this.debug = (e = t.debug) != null ? e : {},
        this.debug.enabled === void 0 && (this.debug.enabled = !1),
        this.debug.logger || (this.debug.logger = (o,r,i,s)=>{
            try {
                s = JSON.stringify(s)
            } catch {
                s = `Object with the following keys failed to stringify: ${Object.keys(s).join(",")}`
            }
            (typeof i == "symbol" || typeof i == "number") && (i = i.toString());
            let a = new Date
              , c = `${a.getHours()}:${a.getMinutes()}:${a.getSeconds()}.${a.getMilliseconds()}`;
            console.log(`[${c}][emittery:${o}][${r}] Event Name: ${i}
	data: ${s}`)
        }
        )
    }
    logIfDebugEnabled(t, e, o) {
        (y.isDebugEnabled || this.debug.enabled) && this.debug.logger(t, this.debug.name, e, o)
    }
    on(t, e) {
        j(e),
        t = Array.isArray(t) ? t : [t];
        for (let o of t) {
            L(o);
            let r = M(this, o);
            r || (r = new Set,
            C.get(this).set(o, r)),
            r.add(e),
            this.logIfDebugEnabled("subscribe", o, void 0),
            _(o) || H(this, $, {
                eventName: o,
                listener: e
            })
        }
        return this.off.bind(this, t, e)
    }
    off(t, e) {
        j(e),
        t = Array.isArray(t) ? t : [t];
        for (let o of t) {
            L(o);
            let r = M(this, o);
            r && (r.delete(e),
            r.size === 0 && C.get(this).delete(o)),
            this.logIfDebugEnabled("unsubscribe", o, void 0),
            _(o) || H(this, k, {
                eventName: o,
                listener: e
            })
        }
    }
    once(t) {
        let e, o = new Promise(r=>{
            e = this.on(t, i=>{
                e(),
                r(i)
            }
            )
        }
        );
        return o.off = e,
        o
    }
    events(t) {
        t = Array.isArray(t) ? t : [t];
        for (let e of t)
            L(e);
        return pt(this, t)
    }
    async emit(t, e) {
        var a;
        if (L(t),
        _(t) && !V)
            throw new TypeError("`eventName` cannot be meta event `listenerAdded` or `listenerRemoved`");
        this.logIfDebugEnabled("emit", t, e),
        Bt(this, t, e);
        let o = (a = M(this, t)) != null ? a : new Set
          , r = S.get(this)
          , i = [...o]
          , s = _(t) ? [] : [...r];
        await lt,
        await Promise.all([...i.map(async c=>{
            if (o.has(c))
                return c(e)
        }
        ), ...s.map(async c=>{
            if (r.has(c))
                return c(t, e)
        }
        )])
    }
    async emitSerial(t, e) {
        var a;
        if (L(t),
        _(t) && !V)
            throw new TypeError("`eventName` cannot be meta event `listenerAdded` or `listenerRemoved`");
        this.logIfDebugEnabled("emitSerial", t, e);
        let o = (a = M(this, t)) != null ? a : new Set
          , r = S.get(this)
          , i = [...o]
          , s = [...r];
        await lt;
        for (let c of i)
            o.has(c) && await c(e);
        for (let c of s)
            r.has(c) && await c(t, e)
    }
    onAny(t) {
        return j(t),
        this.logIfDebugEnabled("subscribeAny", void 0, void 0),
        S.get(this).add(t),
        H(this, $, {
            listener: t
        }),
        this.offAny.bind(this, t)
    }
    anyEvent() {
        return pt(this)
    }
    offAny(t) {
        j(t),
        this.logIfDebugEnabled("unsubscribeAny", void 0, void 0),
        H(this, k, {
            listener: t
        }),
        S.get(this).delete(t)
    }
    clearListeners(t) {
        t = Array.isArray(t) ? t : [t];
        for (let e of t)
            if (this.logIfDebugEnabled("clear", e, void 0),
            typeof e == "string" || typeof e == "symbol" || typeof e == "number") {
                let o = M(this, e);
                o && o.clear();
                let r = U(this, e);
                if (r) {
                    for (let i of r)
                        i.finish();
                    r.clear()
                }
            } else {
                S.get(this).clear();
                for (let[o,r] of C.get(this).entries())
                    r.clear(),
                    C.get(this).delete(o);
                for (let[o,r] of T.get(this).entries()) {
                    for (let i of r)
                        i.finish();
                    r.clear(),
                    T.get(this).delete(o)
                }
            }
    }
    listenerCount(t) {
        var o, r, i, s, a, c;
        t = Array.isArray(t) ? t : [t];
        let e = 0;
        for (let l of t) {
            if (typeof l == "string") {
                e += S.get(this).size + ((r = (o = M(this, l)) == null ? void 0 : o.size) != null ? r : 0) + ((s = (i = U(this, l)) == null ? void 0 : i.size) != null ? s : 0) + ((c = (a = U(this)) == null ? void 0 : a.size) != null ? c : 0);
                continue
            }
            typeof l != "undefined" && L(l),
            e += S.get(this).size;
            for (let p of C.get(this).values())
                e += p.size;
            for (let p of T.get(this).values())
                e += p.size
        }
        return e
    }
    bindMethods(t, e) {
        if (typeof t != "object" || t === null)
            throw new TypeError("`target` must be an object");
        e = ut(e);
        for (let o of e) {
            if (t[o] !== void 0)
                throw new Error(`The property \`${o}\` already exists on \`target\``);
            Object.defineProperty(t, o, {
                enumerable: !1,
                value: this[o].bind(this)
            })
        }
    }
}
  , mt = Object.getOwnPropertyNames(y.prototype).filter(n=>n !== "constructor");
Object.defineProperty(y, "listenerAdded", {
    value: $,
    writable: !1,
    enumerable: !0,
    configurable: !1
});
Object.defineProperty(y, "listenerRemoved", {
    value: k,
    writable: !1,
    enumerable: !0,
    configurable: !1
});
var D = (n,t)=>{
    n.textContent = `${t}`
}
;
var {location: dt, history: Ut} = window
  , ft = n=>{
    if (!n)
        return;
    let {href: t} = n
      , {searchParams: e} = new URL(t);
    return [...e.entries()]
}
  , Dt = async({paginationNext: n, paginationPrevious: t, index: e})=>{
    let o = ft(n || t);
    if (!o || !o.length)
        return;
    let r, i;
    if (o.length === 1) {
        let[a] = o;
        if (!a)
            return;
        [r,i] = a
    } else {
        let {origin: a, pathname: c} = dt
          , l = await it(a + c);
        if (!l)
            return;
        let u = N([], l)[e];
        if (!u)
            return;
        let m = b(u, "next")
          , [d] = ft(m) || [];
        if (!d)
            return;
        [r] = d,
        [,i] = o.find(([h])=>h === r) || []
    }
    if (!r || !i)
        return;
    let s = parseInt(i);
    return [r, s]
}
  , gt = n=>{
    let {paginationNext: t} = n;
    n.extractingPaginationData = new Promise(async e=>{
        let o = await Dt(n);
        if (!o) {
            e();
            return
        }
        let[r,i] = o;
        n.pagesQuery = r,
        n.currentPage = t ? i - 1 : i + 1,
        e()
    }
    )
}
  , ht = ({currentPage: n, pagesQuery: t})=>{
    if (!t || !n)
        return;
    let e = new URL(dt.href)
      , {searchParams: o} = e;
    o.set(t, `${n}`),
    Ut.replaceState(null, "", e.toString())
}
;
var bt = async(n,{items: t, restartWebflow: e, restartIx: o, restartCommerce: r, restartLightbox: i, restartSliders: s, restartTabs: a})=>{
    let c = [[o, "ix2"], [r, "commerce"], [i, "lightbox"], [s, "slider"], [a, "tabs"]];
    if (!e && !c.some(([p])=>p) || !n.some(({needsWebflowRestart: p})=>p))
        return;
    for (let p of t) {
        let u = n.includes(p);
        p.needsWebflowRestart = !u
    }
    if (e) {
        await W();
        return
    }
    let l = c.reduce((p,[u,m])=>(u && p.push(m),
    p), []);
    await W(l)
}
;
var yt = async(n,t=!1,e=!0)=>{
    let {items: o, staticItems: r, itemsPerPage: i, paginationActive: s, currentPage: a, emptyState: c} = n
      , l = []
      , p = []
      , u = [];
    for (let g of o) {
        let {valid: f, currentIndex: w} = g
          , R = B(w);
        if (f) {
            if (l.push(g),
            !s || !a) {
                u.push(g);
                continue
            }
            l.length > (a - 1) * i && l.length <= a * i ? u.push(g) : R && p.push(g)
        } else
            R && p.push(g)
    }
    if (r.length) {
        let g = u.length;
        for (let f of r) {
            let {staticIndex: w} = f;
            if (B(w)) {
                if (w >= g) {
                    p.push(f);
                    continue
                }
                u.splice(w, 0, f)
            }
        }
        for (let f of u.slice(i))
            B(f.currentIndex) && p.push(f);
        u.length = Math.min(u.length, i)
    }
    n.validItems = l,
    n.totalPages = Math.ceil(l.length / i) || 1;
    let m = !l.length;
    n.emptyState = m;
    let d = [];
    u.forEach((g,f)=>{
        g.currentIndex !== f && d.push([g, f, u[f - 1]])
    }
    );
    let h = e && !t || c !== m;
    return h && await n.displayElement(c ? "emptyElement" : "list", !1),
    await Promise.all([...vt(p, n, t), ...Wt(d, n, t)]),
    await n.emitSerial("renderitems", u),
    await bt(u, n),
    h && await n.displayElement(m ? "emptyElement" : "list"),
    u
}
  , vt = (n,{itemsAnimation: t},e)=>n.map(async o=>{
    let {element: r} = o;
    if (e && t) {
        let {animateOut: i, options: s} = t;
        await i(r, {
            remove: !0,
            ...s
        })
    } else
        r.remove();
    o.currentIndex = void 0
}
)
  , Wt = (n,{list: t, itemsAnimation: e},o)=>t ? n.map(async([r,i,s],a)=>{
    r.animating = new Promise(async c=>{
        r.rendering = new Promise(async l=>{
            await (s == null ? void 0 : s.rendering);
            let {element: p, currentIndex: u} = r
              , m = (s == null ? void 0 : s.element) || null;
            if (!B(u) && o && e) {
                let {prepareIn: d, animateIn: h, options: g} = e
                  , {stagger: f, ...w} = g || {}
                  , R = {
                    target: t,
                    insertAfter: m,
                    ...w
                };
                d(p, R),
                Et(p),
                l(),
                f && await G(f * a),
                await h(p, {
                    ...R,
                    prepared: !0
                })
            } else
                m ? t.insertBefore(p, m.nextSibling) : t.prepend(p),
                Et(p),
                l();
            c()
        }
        )
    }
    ),
    await r.rendering,
    r.currentIndex = i
}
) : []
  , Et = n=>{
    if (!/apple/i.test(navigator.vendor))
        return;
    let t = n.querySelectorAll("img");
    for (let e of t)
        e.outerHTML = e.outerHTML
}
;
var v = class extends y {
    constructor(e, o) {
        super();
        this.wrapper = e;
        this.index = o;
        this.emptyState = !1;
        this.paginationActive = !1;
        this.showPaginationQuery = !1;
        this.staticItems = [];
        this.restartWebflow = !1;
        this.restartIx = !1;
        this.restartCommerce = !1;
        this.restartLightbox = !1;
        this.restartSliders = !1;
        this.restartTabs = !1;
        this.cacheItems = !0;
        let r = b(e, "list");
        this.list = r,
        this.paginationWrapper = b(e, "pagination"),
        this.paginationNext = b(e, "next"),
        this.paginationPrevious = b(e, "previous"),
        this.paginationCount = b(e, "pageCount"),
        this.emptyElement = b(e, "empty");
        let i = b(e, "items");
        this.itemsPerPage = this.originalItemsPerPage = i.length,
        this.totalPages = 1,
        gt(this);
        let s = [];
        r && s.push(...i.map(a=>new x(a,r))),
        this.items = s,
        this.validItems = s,
        this.originalItemsOrder = [...s]
    }
    async addItems(e, o="push") {
        let {items: r, list: i, originalItemsOrder: s} = this;
        if (!i)
            return;
        let a = e.map(c=>new x(c,i));
        for (let c of [r, s])
            c[o](...a);
        await this.emit("shouldnest", a),
        await this.emit("shouldcollectprops", a),
        await this.emit("shouldsort", a),
        await this.emit("shouldfilter"),
        await this.renderItems(!0),
        await this.emit("additems", a)
    }
    async addStaticItems(e) {
        let {items: o, staticItems: r, list: i, originalItemsOrder: s} = this;
        if (!i)
            return;
        let a = e.flatMap(({itemElement: c, targetIndex: l, interactive: p, repeat: u})=>{
            let m;
            if (p) {
                m = new x(c,i);
                for (let d of [o, s])
                    d.splice(l, 0, m)
            } else
                m = new x(c,i,l),
                r.push(m);
            if (u) {
                let d = l + u
                  , h = ()=>{
                    for (; d < this.items.length; ) {
                        let g = K(c);
                        this.addStaticItems([{
                            interactive: p,
                            itemElement: g,
                            targetIndex: d
                        }]),
                        d += u
                    }
                }
                ;
                this.on("additems", h),
                h()
            }
            return m
        }
        );
        r.sort((c,l)=>c.staticIndex - l.staticIndex),
        await this.emit("shouldnest", a),
        await this.emit("shouldcollectprops", a),
        await this.emit("shouldsort", a),
        await this.emit("shouldfilter"),
        await this.renderItems(!0),
        await this.emit("additems", a)
    }
    restoreItemsOrder() {
        this.items = [...this.originalItemsOrder]
    }
    async clearItems(e=!0) {
        if (e)
            for (let {element: o} of this.items)
                o.remove();
        this.items = [],
        this.staticItems = [],
        this.originalItemsOrder = [],
        await this.renderItems(!1, !1)
    }
    async renderItems(e, o) {
        return await this.renderingQueue,
        new Promise(async r=>{
            let i = yt(this, e, o);
            this.renderingQueue = i;
            let s = await i;
            r(s)
        }
        )
    }
    async displayElement(e, o=!0, r=!0) {
        let {listAnimation: i} = this
          , s = this[e];
        if (s)
            if (i && r) {
                let {animateIn: a, animateOut: c, options: l} = i;
                await (o ? a : c)(s, l)
            } else
                s.style.display = o ? "" : "none",
                s.style.opacity = o ? "1" : "0"
    }
    async switchPage(e, o=!0) {
        let {currentPage: r, showPaginationQuery: i} = this;
        e !== r && (await this.emit("switchpage", e),
        this.currentPage = e,
        this.scrollToAnchor(),
        i && ht(this),
        o && await this.renderItems())
    }
    initPagination(e) {
        this.paginationActive = !0,
        this.showPaginationQuery = !!e
    }
    addPaginationButton(e, o, r) {
        let {paginationWrapper: i} = this;
        !i || this[o] || r < 0 || (e.style.display = "none",
        i.insertBefore(e, i.children[r]),
        this[o] = e)
    }
    addEmptyElement(e) {
        let {wrapper: o, list: r, emptyElement: i} = this;
        i || (e.style.display = "none",
        o.insertBefore(e, (r == null ? void 0 : r.nextSibling) || null),
        this.emptyElement = e)
    }
    addLoader(e) {
        let {loader: o} = this;
        o || (e.style.display = "none",
        this.loader = e)
    }
    addItemsCount(e) {
        if (this.itemsCount)
            return;
        this.itemsCount = e;
        let o = ()=>D(e, this.items.length);
        o(),
        this.on("additems", o)
    }
    addVisibleCount(e, o, r) {
        if (e && !this.visibleCount) {
            this.visibleCount = e;
            let i = ()=>{
                let s = Math.min(this.itemsPerPage, this.validItems.length);
                D(e, s)
            }
            ;
            i(),
            this.on("renderitems", i)
        }
        if (o && !this.visibleCountFrom) {
            this.visibleCountFrom = o;
            let i = ()=>{
                let s = Math.min(this.itemsPerPage * (this.currentPage || 1) - (this.itemsPerPage - 1), this.validItems.length);
                D(o, s)
            }
            ;
            i(),
            this.on("renderitems", i)
        }
        if (r && !this.visibleCountTo) {
            this.visibleCountTo = r;
            let i = ()=>{
                let s = Math.min(this.itemsPerPage * (this.currentPage || 1), this.validItems.length);
                D(r, s)
            }
            ;
            i(),
            this.on("renderitems", i)
        }
    }
    scrollToAnchor() {
        let {scrollAnchor: e} = this;
        e && window.setTimeout(()=>e.scrollIntoView({
            behavior: "smooth"
        }), 100)
    }
    getAttribute(e) {
        let {wrapper: o, list: r} = this;
        return o.getAttribute(e) || (r == null ? void 0 : r.getAttribute(e))
    }
    getInstanceIndex(e) {
        let {wrapper: o, list: r} = this;
        return Z(o, e) || (r ? Z(r, e) : void 0)
    }
    destroy() {
        var e, o;
        this.clearListeners(),
        (o = (e = window.fsAttributes.cmscore) == null ? void 0 : e.listInstances) == null || o.delete(this.wrapper)
    }
}
;
var Nt = n=>N(n).map(Tt).filter(q)
  , Tt = n=>{
    let t = b(n, "wrapper");
    if (!t)
        return;
    let {fsAttributes: e} = window;
    e.cmscore || (e.cmscore = {});
    let {cmscore: o} = e;
    o.listInstances || (o.listInstances = new Map);
    let {listInstances: r} = o
      , i = r.get(t);
    if (i)
        return i;
    let a = [...document.querySelectorAll(E("wrapper"))].indexOf(t);
    if (a === -1)
        return;
    let c = new v(t,a);
    return r.set(t, c),
    c
}
;
var St = "animation";
var wt = (n,t="1",e="iife")=>{
    let r = `${n}${e === "esm" ? ".esm" : ""}.js`;
    return `https://cdn.jsdelivr.net/npm/@finsweet/attributes-${n}@${t}/${r}`
}
;
var jt = wt(St, "1", "esm")
  , et = async()=>{
    let {fsAttributes: n} = window;
    n.animation || (n.animation = {});
    let {animation: t} = n;
    if (t.import)
        return t.import;
    try {
        return t.import = import(jt),
        t.import
    } catch (e) {
        A.alert(`${e}`, "error");
        return
    }
}
;
var Ht = async(n,{durationKey: t, easingKey: e})=>{
    let o = await et();
    if (!o)
        return;
    let {animations: {fade: r}, easings: i} = o
      , {listAnimation: s} = n
      , a = n.getAttribute(t)
      , c = n.getAttribute(e);
    if (s && !a && !c)
        return;
    let l = O(c, i) ? c : void 0
      , p = a ? parseFloat(a) / 2e3 : .1;
    if (!s) {
        n.listAnimation = {
            ...r,
            options: {
                easing: l,
                duration: p
            }
        };
        return
    }
    let {options: u} = s;
    if (!u) {
        s.options = {
            easing: l,
            duration: p
        };
        return
    }
    u.easing || (u.easing = l),
    a && (u.duration = p)
}
  , Ft = async(n,{animationKey: t, durationKey: e, easingKey: o, staggerKey: r})=>{
    let i = await et();
    if (!i)
        return;
    let {animations: s, easings: a} = i
      , c = n.getAttribute(t)
      , l = O(c, z(s)) ? s[c] : s.fade
      , p = n.getAttribute(e)
      , u = n.getAttribute(o)
      , m = n.getAttribute(r);
    n.itemsAnimation = {
        ...l,
        options: {
            easing: O(u, a) ? u : void 0,
            duration: p ? parseFloat(p) / 1e3 : void 0,
            stagger: m ? parseFloat(m) : void 0
        }
    }
}
;
var $t = (n,t)=>{
    let {version: e} = window.fsAttributes.cmscore || {};
    if (!e)
        return !1;
    let o = {
        numeric: !0,
        sensitivity: "base"
    }
      , r = t.localeCompare(e, void 0, o);
    return r === 0 || (n === ">=" ? r < 0 : r > 0)
}
;
export {x as CMSItem, v as CMSList, Ft as addItemsAnimation, Ht as addListAnimation, $t as checkCMSCoreVersion, Tt as createCMSListInstance, Nt as createCMSListInstances, At as version};
