import{b as v,u as g,a as o,x as C,j as s,F as u,aj as w,B as T,f as k,ak as F,h as p,i as P,k as S,al as _,r as h,l as B,m as D,s as E,H as M}from"./index-Bf7JSVkZ.js";import{f as O,C as e,I as H,D as L}from"./convertProps-MwX7ogwQ.js";const $=({image:r,name:c,description:j,price:l,isNew:m,id:n,loyalty_points:x})=>{const t=v(),d=g();function f(){const a={quantity:1,total:+l,table:Number(localStorage.getItem("table_key")),product:+n};d(F({data:a})).then(()=>{p.success(`Товар ${c} успешно добвлен `)})}const{data:b}=o(a=>a.tableCart),i=b.items.find(a=>a.product.id===n);async function y(a){try{await P.deleteTableOrderItemById(a).then(()=>{d(S(a)),d(_({id:Number(localStorage.getItem("table_key"))})),p.success("товар успешно удален из корзины")})}catch(I){console.log(I)}}const{tableid:N}=C();return s.jsxs("div",{className:"pizza-card",children:[s.jsxs("div",{onClick:()=>t(`/table/${N}/tablefood/${n}`),className:"image-wrapper",children:[s.jsx("img",{src:r,alt:c,className:"pizza-image"}),m&&s.jsxs("span",{className:"new-label",children:["получите баллы ",x]})]}),s.jsxs("div",{className:"pizza-info",children:[s.jsx("h3",{className:"pizza-name",children:c}),s.jsx("p",{className:"pizza-description",children:j}),s.jsx("br",{}),s.jsxs(u,{gap:5,justify:"space-between",align:"center",children:[s.jsxs("div",{className:"pizza-price",children:["от ",i?i.quantity*i.product.price:l," сом"]}),i?s.jsxs(u,{children:[s.jsx(w,{record:i}),s.jsx(T,{onClick:()=>y(i.id),danger:!0,style:{width:"32px",display:"flex",alignItems:"center",justifyContent:"center",marginLeft:"5px"},icon:s.jsx(k,{style:{color:"red"}})})]}):s.jsx("button",{className:"select-button",onClick:f,children:"Выбрать"})]})]})]})},q=()=>{const r=g(),c=o(t=>t.product.data.results),j=o(t=>t.product.data.next),{menuprops:l}=o(t=>t.window),{laoding:m}=o(t=>t.product);function n(){r(E(l.offset+20))}const x="scrollTarget";return h.useEffect(()=>{r(B(x))},[r]),h.useEffect(()=>{r(D({filters:O({menuprops:l})}))},[l]),s.jsx("div",{className:"sushilistsex",children:s.jsx("div",{id:x,className:"pizza-list",style:{paddingTop:"8rem"},children:m?s.jsxs(s.Fragment,{children:[s.jsx(e,{}),s.jsx(e,{}),s.jsx(e,{}),s.jsx(e,{}),s.jsx(e,{}),s.jsx(e,{}),s.jsx(e,{}),s.jsx(e,{}),s.jsx(e,{}),s.jsx(e,{}),s.jsx(e,{})]}):s.jsx(H,{style:{width:"100%"},dataLength:c.length,next:n,className:"pizza-list",hasMore:j!==null,loader:s.jsxs(s.Fragment,{children:[s.jsx(e,{}),s.jsx(e,{}),s.jsx(e,{}),s.jsx(e,{}),s.jsx(e,{}),s.jsx(e,{}),s.jsx(e,{}),s.jsx(e,{}),s.jsx(e,{}),s.jsx(e,{}),s.jsx(e,{})]}),endMessage:s.jsx(L,{plain:!0,children:"Это все, ничего больше. 🤐"}),scrollableTarget:"scrollableDiv",children:c.map((t,d)=>s.jsx($,{id:t.id,image:t.iiko_image,name:t.title,loyalty_points:t==null?void 0:t.loyalty_points,description:t.description,price:t.price,isNew:!0},d))})})})},R=()=>s.jsxs(s.Fragment,{children:[s.jsx(M,{children:s.jsx("title",{children:"Mnogosushi | Главная"})}),s.jsx("div",{className:"container",children:s.jsx(q,{})})]});export{R as default};
