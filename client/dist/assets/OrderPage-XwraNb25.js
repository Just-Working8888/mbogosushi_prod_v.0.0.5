import{a as s,g as de,m as ue,r as Y,u as q,a2 as ne,C as J,a3 as pe,a4 as he,a5 as ae,O as be,c as Z,a6 as ge,a7 as me,a8 as xe,L as Ce,a9 as ye,N as fe,aa as Se,ab as ve,p as U,o as F,ac as je,ad as ke,ae as X,e as $e,b as Ie,d as W,af as _e,j as e,Q as N,ag as se,ah as A,a0 as te,ai as we,B as H,F as Pe,l as oe,Y as Q,k as Be,Z as Re,q as Oe,H as Ee}from"./index-B2GXyBg6.js";const ie=s.createContext(null),Te=ie.Provider,le=s.createContext(null),ze=le.Provider,Ne=t=>{const{componentCls:a,antCls:i}=t,r=`${a}-group`;return{[r]:Object.assign(Object.assign({},Y(t)),{display:"inline-block",fontSize:0,[`&${r}-rtl`]:{direction:"rtl"},[`${i}-badge ${i}-badge-count`]:{zIndex:1},[`> ${i}-badge:not(:first-child) > ${i}-button-wrapper`]:{borderInlineStart:"none"}})}},De=t=>{const{componentCls:a,wrapperMarginInlineEnd:i,colorPrimary:r,radioSize:n,motionDurationSlow:u,motionDurationMid:b,motionEaseInOutCirc:m,colorBgContainer:g,colorBorder:f,lineWidth:k,colorBgContainerDisabled:S,colorTextDisabled:O,paddingXS:$,dotColorDisabled:I,lineType:x,radioColor:l,radioBgColor:v,calc:p}=t,_=`${a}-inner`,j=p(n).sub(p(4).mul(2)),C=p(1).mul(n).equal({unit:!0});return{[`${a}-wrapper`]:Object.assign(Object.assign({},Y(t)),{display:"inline-flex",alignItems:"baseline",marginInlineStart:0,marginInlineEnd:i,cursor:"pointer",[`&${a}-wrapper-rtl`]:{direction:"rtl"},"&-disabled":{cursor:"not-allowed",color:t.colorTextDisabled},"&::after":{display:"inline-block",width:0,overflow:"hidden",content:'"\\a0"'},[`${a}-checked::after`]:{position:"absolute",insetBlockStart:0,insetInlineStart:0,width:"100%",height:"100%",border:`${q(k)} ${x} ${r}`,borderRadius:"50%",visibility:"hidden",opacity:0,content:'""'},[a]:Object.assign(Object.assign({},Y(t)),{position:"relative",display:"inline-block",outline:"none",cursor:"pointer",alignSelf:"center",borderRadius:"50%"}),[`${a}-wrapper:hover &,
        &:hover ${_}`]:{borderColor:r},[`${a}-input:focus-visible + ${_}`]:Object.assign({},ne(t)),[`${a}:hover::after, ${a}-wrapper:hover &::after`]:{visibility:"visible"},[`${a}-inner`]:{"&::after":{boxSizing:"border-box",position:"absolute",insetBlockStart:"50%",insetInlineStart:"50%",display:"block",width:C,height:C,marginBlockStart:p(1).mul(n).div(-2).equal({unit:!0}),marginInlineStart:p(1).mul(n).div(-2).equal({unit:!0}),backgroundColor:l,borderBlockStart:0,borderInlineStart:0,borderRadius:C,transform:"scale(0)",opacity:0,transition:`all ${u} ${m}`,content:'""'},boxSizing:"border-box",position:"relative",insetBlockStart:0,insetInlineStart:0,display:"block",width:C,height:C,backgroundColor:g,borderColor:f,borderStyle:"solid",borderWidth:k,borderRadius:"50%",transition:`all ${b}`},[`${a}-input`]:{position:"absolute",inset:0,zIndex:1,cursor:"pointer",opacity:0},[`${a}-checked`]:{[_]:{borderColor:r,backgroundColor:v,"&::after":{transform:`scale(${t.calc(t.dotSize).div(n).equal()})`,opacity:1,transition:`all ${u} ${m}`}}},[`${a}-disabled`]:{cursor:"not-allowed",[_]:{backgroundColor:S,borderColor:f,cursor:"not-allowed","&::after":{backgroundColor:I}},[`${a}-input`]:{cursor:"not-allowed"},[`${a}-disabled + span`]:{color:O,cursor:"not-allowed"},[`&${a}-checked`]:{[_]:{"&::after":{transform:`scale(${p(j).div(n).equal()})`}}}},[`span${a} + *`]:{paddingInlineStart:$,paddingInlineEnd:$}})}},Me=t=>{const{buttonColor:a,controlHeight:i,componentCls:r,lineWidth:n,lineType:u,colorBorder:b,motionDurationSlow:m,motionDurationMid:g,buttonPaddingInline:f,fontSize:k,buttonBg:S,fontSizeLG:O,controlHeightLG:$,controlHeightSM:I,paddingXS:x,borderRadius:l,borderRadiusSM:v,borderRadiusLG:p,buttonCheckedBg:_,buttonSolidCheckedColor:w,colorTextDisabled:j,colorBgContainerDisabled:C,buttonCheckedBgDisabled:P,buttonCheckedColorDisabled:D,colorPrimary:R,colorPrimaryHover:B,colorPrimaryActive:c,buttonSolidCheckedBg:E,buttonSolidCheckedHoverBg:M,buttonSolidCheckedActiveBg:T,calc:y}=t;return{[`${r}-button-wrapper`]:{position:"relative",display:"inline-block",height:i,margin:0,paddingInline:f,paddingBlock:0,color:a,fontSize:k,lineHeight:q(y(i).sub(y(n).mul(2)).equal()),background:S,border:`${q(n)} ${u} ${b}`,borderBlockStartWidth:y(n).add(.02).equal(),borderInlineStartWidth:0,borderInlineEndWidth:n,cursor:"pointer",transition:[`color ${g}`,`background ${g}`,`box-shadow ${g}`].join(","),a:{color:a},[`> ${r}-button`]:{position:"absolute",insetBlockStart:0,insetInlineStart:0,zIndex:-1,width:"100%",height:"100%"},"&:not(:first-child)":{"&::before":{position:"absolute",insetBlockStart:y(n).mul(-1).equal(),insetInlineStart:y(n).mul(-1).equal(),display:"block",boxSizing:"content-box",width:1,height:"100%",paddingBlock:n,paddingInline:0,backgroundColor:b,transition:`background-color ${m}`,content:'""'}},"&:first-child":{borderInlineStart:`${q(n)} ${u} ${b}`,borderStartStartRadius:l,borderEndStartRadius:l},"&:last-child":{borderStartEndRadius:l,borderEndEndRadius:l},"&:first-child:last-child":{borderRadius:l},[`${r}-group-large &`]:{height:$,fontSize:O,lineHeight:q(y($).sub(y(n).mul(2)).equal()),"&:first-child":{borderStartStartRadius:p,borderEndStartRadius:p},"&:last-child":{borderStartEndRadius:p,borderEndEndRadius:p}},[`${r}-group-small &`]:{height:I,paddingInline:y(x).sub(n).equal(),paddingBlock:0,lineHeight:q(y(I).sub(y(n).mul(2)).equal()),"&:first-child":{borderStartStartRadius:v,borderEndStartRadius:v},"&:last-child":{borderStartEndRadius:v,borderEndEndRadius:v}},"&:hover":{position:"relative",color:R},"&:has(:focus-visible)":Object.assign({},ne(t)),[`${r}-inner, input[type='checkbox'], input[type='radio']`]:{width:0,height:0,opacity:0,pointerEvents:"none"},[`&-checked:not(${r}-button-wrapper-disabled)`]:{zIndex:1,color:R,background:_,borderColor:R,"&::before":{backgroundColor:R},"&:first-child":{borderColor:R},"&:hover":{color:B,borderColor:B,"&::before":{backgroundColor:B}},"&:active":{color:c,borderColor:c,"&::before":{backgroundColor:c}}},[`${r}-group-solid &-checked:not(${r}-button-wrapper-disabled)`]:{color:w,background:E,borderColor:E,"&:hover":{color:w,background:M,borderColor:M},"&:active":{color:w,background:T,borderColor:T}},"&-disabled":{color:j,backgroundColor:C,borderColor:b,cursor:"not-allowed","&:first-child, &:hover":{color:j,backgroundColor:C,borderColor:b}},[`&-disabled${r}-button-wrapper-checked`]:{color:D,backgroundColor:P,borderColor:b,boxShadow:"none"}}}},Fe=t=>{const{wireframe:a,padding:i,marginXS:r,lineWidth:n,fontSizeLG:u,colorText:b,colorBgContainer:m,colorTextDisabled:g,controlItemBgActiveDisabled:f,colorTextLightSolid:k,colorPrimary:S,colorPrimaryHover:O,colorPrimaryActive:$,colorWhite:I}=t,x=4,l=u,v=a?l-x*2:l-(x+n)*2;return{radioSize:l,dotSize:v,dotColorDisabled:g,buttonSolidCheckedColor:k,buttonSolidCheckedBg:S,buttonSolidCheckedHoverBg:O,buttonSolidCheckedActiveBg:$,buttonBg:m,buttonCheckedBg:m,buttonColor:b,buttonCheckedBgDisabled:f,buttonCheckedColorDisabled:g,buttonPaddingInline:i-n,wrapperMarginInlineEnd:r,radioColor:a?S:I,radioBgColor:a?m:S}},ce=de("Radio",t=>{const{controlOutline:a,controlOutlineWidth:i}=t,r=`0 0 0 ${q(i)} ${a}`,u=ue(t,{radioFocusShadow:r,radioButtonFocusShadow:r});return[Ne(u),De(u),Me(u)]},Fe,{unitless:{radioSize:!0,dotSize:!0}});var qe=function(t,a){var i={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&a.indexOf(r)<0&&(i[r]=t[r]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,r=Object.getOwnPropertySymbols(t);n<r.length;n++)a.indexOf(r[n])<0&&Object.prototype.propertyIsEnumerable.call(t,r[n])&&(i[r[n]]=t[r[n]]);return i};const Ae=(t,a)=>{var i,r;const n=s.useContext(ie),u=s.useContext(le),{getPrefixCls:b,direction:m,radio:g}=s.useContext(J),f=s.useRef(null),k=pe(a,f),{isFormItemInput:S}=s.useContext(he),O=T=>{var y,z;(y=t.onChange)===null||y===void 0||y.call(t,T),(z=n==null?void 0:n.onChange)===null||z===void 0||z.call(n,T)},{prefixCls:$,className:I,rootClassName:x,children:l,style:v,title:p}=t,_=qe(t,["prefixCls","className","rootClassName","children","style","title"]),w=b("radio",$),j=((n==null?void 0:n.optionType)||u)==="button",C=j?`${w}-button`:w,P=ae(w),[D,R,B]=ce(w,P),c=Object.assign({},_),E=s.useContext(be);n&&(c.name=n.name,c.onChange=O,c.checked=t.value===n.value,c.disabled=(i=c.disabled)!==null&&i!==void 0?i:n.disabled),c.disabled=(r=c.disabled)!==null&&r!==void 0?r:E;const M=Z(`${C}-wrapper`,{[`${C}-wrapper-checked`]:c.checked,[`${C}-wrapper-disabled`]:c.disabled,[`${C}-wrapper-rtl`]:m==="rtl",[`${C}-wrapper-in-form-item`]:S},g==null?void 0:g.className,I,x,R,B,P);return D(s.createElement(ge,{component:"Radio",disabled:c.disabled},s.createElement("label",{className:M,style:Object.assign(Object.assign({},g==null?void 0:g.style),v),onMouseEnter:t.onMouseEnter,onMouseLeave:t.onMouseLeave,title:p},s.createElement(me,Object.assign({},c,{className:Z(c.className,{[xe]:!j}),type:"radio",prefixCls:C,ref:k})),l!==void 0?s.createElement("span",null,l):null)))},K=s.forwardRef(Ae),Le=s.forwardRef((t,a)=>{const{getPrefixCls:i,direction:r}=s.useContext(J),{prefixCls:n,className:u,rootClassName:b,options:m,buttonStyle:g="outline",disabled:f,children:k,size:S,style:O,id:$,optionType:I,name:x,defaultValue:l,value:v,onChange:p,onMouseEnter:_,onMouseLeave:w,onFocus:j,onBlur:C}=t,[P,D]=Ce(l,{value:v}),R=s.useCallback(h=>{const G=P,ee=h.target.value;"value"in t||D(ee),ee!==G&&(p==null||p(h))},[P,D,p]),B=i("radio",n),c=`${B}-group`,E=ae(B),[M,T,y]=ce(B,E);let z=k;m&&m.length>0&&(z=m.map(h=>typeof h=="string"||typeof h=="number"?s.createElement(K,{key:h.toString(),prefixCls:B,disabled:f,value:h,checked:P===h},h):s.createElement(K,{key:`radio-group-value-options-${h.value}`,prefixCls:B,disabled:h.disabled||f,value:h.value,checked:P===h.value,title:h.title,style:h.style,id:h.id,required:h.required},h.label)));const V=ye(S),o=Z(c,`${c}-${g}`,{[`${c}-${V}`]:V,[`${c}-rtl`]:r==="rtl"},u,b,T,y,E),d=s.useMemo(()=>({onChange:R,value:P,disabled:f,name:x,optionType:I}),[R,P,f,x,I]);return M(s.createElement("div",Object.assign({},fe(t,{aria:!0,data:!0}),{className:o,style:O,onMouseEnter:_,onMouseLeave:w,onFocus:j,onBlur:C,id:$,ref:a}),s.createElement(Te,{value:d},z)))}),Ve=s.memo(Le);var He=function(t,a){var i={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&a.indexOf(r)<0&&(i[r]=t[r]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,r=Object.getOwnPropertySymbols(t);n<r.length;n++)a.indexOf(r[n])<0&&Object.prototype.propertyIsEnumerable.call(t,r[n])&&(i[r[n]]=t[r[n]]);return i};const Ge=(t,a)=>{const{getPrefixCls:i}=s.useContext(J),{prefixCls:r}=t,n=He(t,["prefixCls"]),u=i("radio",r);return s.createElement(ze,{value:"button"},s.createElement(K,Object.assign({prefixCls:u},n,{type:"radio",ref:a})))},We=s.forwardRef(Ge),L=K;L.Button=We;L.Group=Ve;L.__ANT_RADIO=!0;const Ue=Se("biling/createBiling",async({data:t},{signal:a,dispatch:i})=>{try{const r=ve.CancelToken.source();a.addEventListener("abort",()=>r.cancel("Operation canceled by the user."));const n=await U.createBilingItem(t,r.token);F.success(n.data.payment_code+"   Сохраните код оплаты"),localStorage.removeItem("cart_id"),localStorage.removeItem("table_key"),localStorage.removeItem("session_key");const u=localStorage.getItem("session_key"),b=localStorage.getItem("cart_id");return!u&&!b&&i(je({data:{session_key:ke(),discount_amount:0,promo_code:!1}})).then(m=>{console.log(m),i(X({id:m.payload.id}))}),n.data}catch{F.error("Ошибка сервера")}}),{Option:re}=se,Xe=()=>{var z,V;const[t,a]=s.useState("Самовывоз"),[i,r]=s.useState(""),[n,u]=s.useState(0),[b,m]=s.useState("");console.log(n);const[g,f]=s.useState(!1),[k,S]=s.useState(0),O=$e(),[$,I]=s.useState("bankCard"),x=Ie(),{data:l}=W(o=>o.cart),v=l.discount_amount,p=W(o=>o.point),_=l==null?void 0:l.points_used,w=W(o=>o.adresses.adressTitle),j=W(o=>{var d;return((d=o.user.data)==null?void 0:d.loyalty_points)||0});s.useEffect(()=>{const o=localStorage.getItem("cart_id");o&&x(X({id:Number(o)}))},[x]);const C=o=>{a(o.target.value)},P=o=>{I(o)},D=o=>{f(o.target.checked),o.target.checked||S(0)},R=o=>{const d=Number(o.target.value);d>j?(F.error(`Вы не можете использовать больше чем ${j} баллов`),S(j)):S(d)},B=async o=>{try{await U.deleteCartItemById(o).then(()=>{x(Oe(o)),F.success("Товар успешно удалён из корзины")})}catch(d){console.log(d)}},c=((z=l.items)==null?void 0:z.reduce((o,d)=>o+parseFloat(d.product.price)*d.quantity,0))||0,E=(((V=l.items)==null?void 0:V.reduce((o,d)=>o+parseFloat(d.product.price)*d.quantity,0))||0)-l.discount_amount-k;s.useEffect(()=>{t==="Доставка"&&x(_e({data:{lon:`${p.adressPoint[0]}`,lat:`${p.adressPoint[1]}`}}))},[p,w,t]);const M=async o=>{console.log(o);const d=localStorage.getItem("user_id")?{billing_receipt_type:o.billing_receipt_type,user_id:localStorage.getItem("user_id"),delivery_price:"320",street:b,phone:o.phone,payment_method:o.payment_method,note:o.note,status:!0,parent:0,change_price:o.change_price,promocode_used:v,points_used:Number(_)}:{billing_receipt_type:o.billing_receipt_type,delivery_price:"320",street:b,phone:o.phone,payment_method:o.payment_method,note:o.note,status:!0,promocode_used:v,parent:0,change_price:o.change_price};x(Ue({data:d})).then(h=>{var G;O(`/code/${(G=h==null?void 0:h.payload)==null?void 0:G.payment_code}`)})},T=async()=>{try{const o=localStorage.getItem("cart_id"),d=await U.applyPromoCode({cart_id:o,promo_code:i});u(d.data.discount_amount),x(X({id:Number(o)})),F.success(d.data.success)}catch{F.error("Не удалось применить промо-код")}},y=async()=>{try{const o=localStorage.getItem("cart_id"),d=await U.applyPoints({user_id:localStorage.getItem("user_id"),points_used:Number(k),cart_id:localStorage.getItem("cart_id")});u(d.data.discount_amount),x(X({id:Number(o)})),F.success(d.data.success)}catch{F.error("Не удалось применить промо-код")}};return e.jsxs("div",{className:"order-container",children:[e.jsxs("div",{className:"he",children:[e.jsxs("div",{className:"personal-info-section",children:[e.jsx("h2",{children:" Информация"}),e.jsxs(N,{onFinish:M,layout:"vertical",children:[e.jsx(N.Item,{initialValue:"Самовывоз",label:"Тип получения",name:"billing_receipt_type",children:e.jsxs(L.Group,{onChange:C,value:t,children:[e.jsx(L,{value:"Доставка",children:"Доставка"}),e.jsx(L,{value:"Самовывоз",children:"Самовывоз"})]})}),e.jsx(N.Item,{initialValue:"cash",label:"Метод оплаты",name:"payment_method",children:e.jsxs(se,{defaultValue:"cash",onChange:P,children:[e.jsx(re,{value:"cash",children:"Наличные"}),e.jsx(re,{value:"eWallet",children:"Электронный кошелек"})]})}),$==="cash"&&e.jsx(N.Item,{label:"Сдача с",name:"change_price",children:e.jsx(A,{placeholder:"Введите сумму для сдачи"})}),e.jsx(N.Item,{label:"Телефон",name:"phone",initialValue:"+996 ",children:e.jsx(A,{placeholder:"Введите номер телефона"})}),e.jsx(N.Item,{label:"Комментарий к заказу",name:"note",children:e.jsx(A.TextArea,{rows:3,placeholder:"Укажите тут дополнительную информацию для курьера"})}),e.jsx(te,{fallback:e.jsx(e.Fragment,{}),children:e.jsxs(e.Fragment,{children:[e.jsx(N.Item,{children:e.jsx(we,{checked:g,onChange:D,children:"Потратить баллы"})}),g&&e.jsxs(N.Item,{name:"points",label:`Доступно баллов: ${j}`,children:[e.jsx(A,{type:"number",value:k,onChange:R,max:j,placeholder:"Количество баллов"}),e.jsx(H,{onClick:y,children:"Использовать баллы"})]})]})}),e.jsx(N.Item,{children:e.jsx(H,{type:"primary",htmlType:"submit",block:!0,children:"Оформить заказ"})})]})]}),t==="Доставка"&&e.jsxs("div",{className:"address-section",children:[e.jsx("h2",{children:" Адрес доставки"}),e.jsx("br",{}),e.jsxs(e.Fragment,{children:[e.jsx(A,{onChange:o=>m(o.target.value),placeholder:"Адрес"}),e.jsx("br",{})]})]})]}),e.jsxs("div",{className:"order-summary-section he",children:[e.jsxs("div",{className:"",children:[e.jsx("h2",{children:e.jsxs(Pe,{justify:"space-between",children:[" Корзина ",e.jsx(H,{icon:e.jsx(oe,{}),className:"clear-cart-btn",children:"Очистить корзину"})]})}),e.jsx(Q,{itemLayout:"horizontal",dataSource:l.items,renderItem:o=>e.jsx(Q.Item,{actions:[e.jsxs("div",{className:"rightBar",children:[e.jsx(H,{onClick:()=>B(o.id),style:{width:"32px",display:"flex",alignItems:"center",justifyContent:"center",padding:"0px 0px 0px 7px"},type:"text",icon:e.jsx(oe,{style:{color:"red"}}),children:"      "}),e.jsx(Be,{record:o})]})],children:e.jsx(Q.Item.Meta,{avatar:e.jsx(Re,{shape:"square",size:"large",style:{height:"100px",width:"100px"},src:o.product.iiko_image}),title:o.product.title,description:e.jsxs("div",{children:[e.jsx("p",{children:o.product.description}),e.jsxs("span",{style:{color:"red"},children:[parseFloat(o.product.price)*o.quantity," c"]})]})})})})]}),e.jsx("br",{}),!l.promo_code&&e.jsx(te,{fallback:e.jsx("p",{children:"Авторизуйтесь чтобы использовать промокод"}),children:e.jsxs("div",{className:"promo-code-section",children:[e.jsx("h3",{children:"Введите промо-код:"}),e.jsx(A,{placeholder:"Введите промо-код",value:i,onChange:o=>r(o.target.value),style:{marginBottom:"10px"}}),e.jsx(H,{type:"primary",onClick:T,block:!0,children:"Применить промо-код"})]})}),e.jsx("br",{}),e.jsxs("h3",{children:["Итого: ",E," c ",e.jsx("p",{children:"без учета доставки"})]}),e.jsxs("div",{className:"order-details",children:[e.jsxs("p",{children:["Стоимость товаров: ",c," c"]}),e.jsxs("p",{children:["Скидка: ",l.discount_amount]}),e.jsxs("p",{children:["Потрачено баллов:",l.points_used]}),t==="Доставка"&&e.jsxs(e.Fragment,{children:[e.jsxs("p",{children:["Адресc: ",b," "]}),e.jsx("p",{children:"Доставка: 320 "})]})]})]})]})},Qe=()=>{const t=()=>{window.scrollTo({top:0,behavior:"smooth"})};return s.useEffect(()=>{t()},[]),e.jsxs("div",{children:[e.jsx(Ee,{children:e.jsx("title",{children:"Mnogosushi | Оформление"})}),e.jsx(Xe,{})]})};export{Qe as default};
