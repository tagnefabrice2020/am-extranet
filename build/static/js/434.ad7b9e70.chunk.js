"use strict";(self.webpackChunkextranet_ui=self.webpackChunkextranet_ui||[]).push([[434],{2039:function(e,n,t){var s=t(184);n.Z=function(e){var n=e.currentPage,t=e.onPageChange,r=(e.itemsPerPage,e.length);return(0,s.jsxs)("ul",{className:"pagination mb-3",style:{margin:"0 auto",width:"300px",display:"flex",justifyContent:"center"},children:[(0,s.jsx)("li",{className:"page-item",children:(0,s.jsx)("button",{className:"page-link",style:{border:"1px solid",borderRight:"none"},onClick:function(){return t(n-1)},disabled:1===n,children:"\xab"})}),(0,s.jsx)("li",{className:"page-item",children:(0,s.jsx)("span",{className:"page-link",children:n})}),(0,s.jsx)("li",{className:"page-item",children:(0,s.jsx)("span",{className:"page-link",children:" Sur "})}),(0,s.jsx)("li",{className:"page-item",children:(0,s.jsx)("span",{className:"page-link",children:0===r?1:r})}),(0,s.jsx)("li",{className:"page-item",children:(0,s.jsx)("button",{className:"page-link",style:{border:"1px solid",borderLeft:"none"},onClick:function(){t(n+1)},disabled:n===r||0===r,children:"\xbb"})})]})}},8138:function(e,n,t){t.d(n,{Z:function(){return r}});t(2791);var s=t(184),r=function(){return(0,s.jsxs)("table",{cellPadding:"0",cellSpacing:"0",width:"100%",className:"w3samples_table_loader",children:[(0,s.jsx)("thead",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{className:"col1",children:(0,s.jsx)("span",{})}),(0,s.jsx)("th",{className:"col4",children:(0,s.jsx)("span",{})}),(0,s.jsx)("th",{className:"col5",children:(0,s.jsx)("span",{})})]})}),(0,s.jsxs)("tbody",{children:[(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{className:"col1",children:(0,s.jsx)("span",{})}),(0,s.jsx)("td",{className:"col4",children:(0,s.jsx)("span",{})}),(0,s.jsx)("td",{className:"col5",children:(0,s.jsx)("span",{})})]}),(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{className:"col1",children:(0,s.jsx)("span",{})}),(0,s.jsx)("td",{className:"col4",children:(0,s.jsx)("span",{})}),(0,s.jsx)("td",{className:"col5",children:(0,s.jsx)("span",{})})]}),(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{className:"col1",children:(0,s.jsx)("span",{})}),(0,s.jsx)("td",{className:"col4",children:(0,s.jsx)("span",{})}),(0,s.jsx)("td",{className:"col5",children:(0,s.jsx)("span",{})})]}),(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{className:"col1",children:(0,s.jsx)("span",{})}),(0,s.jsx)("td",{className:"col4",children:(0,s.jsx)("span",{})}),(0,s.jsx)("td",{className:"col5",children:(0,s.jsx)("span",{})})]}),(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{className:"col1",children:(0,s.jsx)("span",{})}),(0,s.jsx)("td",{className:"col4",children:(0,s.jsx)("span",{})}),(0,s.jsx)("td",{className:"col5",children:(0,s.jsx)("span",{})})]}),(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{className:"col1",children:(0,s.jsx)("span",{})}),(0,s.jsx)("td",{className:"col4",children:(0,s.jsx)("span",{})}),(0,s.jsx)("td",{className:"col5",children:(0,s.jsx)("span",{})})]})]})]})}},348:function(e,n,t){t.d(n,{jL:function(){return j},gf:function(){return g},CP:function(){return f},v4:function(){return m},QS:function(){return u},KE:function(){return h},pw:function(){return x},W$:function(){return v}});var s=t(577),r=t(5671),a=t(3144),c=t(4569),i=t.n(c),l=t(3197),o=new(function(){function e(){(0,r.Z)(this,e)}return(0,a.Z)(e,[{key:"fetchAppointments",value:function(e,n){return i().get(l.T+"/appointments?page=".concat(e,"&perPage=").concat(n)).then((function(e){return e.data.data}))}},{key:"search",value:function(e,n,t){return console.log(e),i().get(l.T+"/appointments/".concat(e,"/search?page=").concat(n,"&perPage=").concat(t)).then((function(e){return e.data.data}))}},{key:"store",value:function(e){return i().post(l.T+"/appointments",e).then((function(e){return e}))}},{key:"fetchOneAppointment",value:function(e){return i().get(l.T+"/appointments/".concat(e,"/show")).then((function(e){return console.log(e.data),e.data.appointment}))}},{key:"update",value:function(e,n){return console.log(n),i().patch(l.T+"/appointments/".concat(n,"/update"),e).then((function(e){return e}))}}]),e}()),d=t(5125),u=function(e){return{type:d.$R,payload:e}},p=function(e){return{type:d.Gg,payload:e}},h=function(e){return{type:d.$_,payload:e}},m=function(e){return{type:d.Oo,payload:e}},x=function(e){return function(n){n({type:d.FH}),o.store(e).then((function(e){if(201===e.status)return n({type:d.ds}),s.Am.success("Rendez-vous ajouter avec succ\xe8ss."),Promise.resolve()}),(function(e){s.Am.error("Une erreur c'est produit pendant l'ajouter du rendez-vous."),s.Am.error("Veuillez contacter le service de maintenance.")}))}},j=function(e,n){return function(t,r){r().appointments.searchValue.length<=0&&(t({type:d.hG}),o.fetchAppointments(e,n).then((function(e){return t(p(e.last_page)),t(h(e.per_page)),t(function(e){return{type:d.mh,payload:e}}(e.data)),Promise.resolve()}),(function(){return s.Am.error("Une erreur est souvenue lors du chargement des rendez-vous."),s.Am.error("Veuillez contacter le service de maintenance."),Promise.reject()})))}},f=function(e,n){return function(t,r){var a,c=r().appointments;c.searchValue.length>0?o.search(c.searchValue,e,n).then((function(e){console.log(e),console.log(c);var n=Math.ceil(e.total/e.per_page);return t(u(e.current_page)),t(h(e.per_page)),t(p(n)),t(function(e){return{type:d.UI,payload:e}}(e.data)),Promise.resolve()}),(function(){return s.Am.error("Une erreur est souvenue lors du chargement des rendez-vous."),s.Am.error("Veuillez contacter le service de maintenance."),Promise.reject()})):(t((a=c.initialAppointments,{type:d.V$,payload:a})),t(p(c.initialTotalPages)))}},g=function(e){return function(n){n({type:d.ic}),o.fetchOneAppointment(e).then((function(e){return n(function(e){return{type:d.oB,payload:e}}(e)),console.log(e),Promise.resolve()}),(function(e){return n({type:d.QP}),s.Am.error("Impossible de charger les information du rendez-vous."),Promise.reject()}))}},v=function(e,n){return function(t){o.update(e,n).then((function(e){console.log(e),200===e.status&&s.Am.success("Rendez-vous enregistrer avec success.")}),(function(e){console.log(e)}))}}},5434:function(e,n,t){t.r(n);var s,r,a=t(168),c=t(5861),i=t(7757),l=t.n(i),o=t(2791),d=t(7581),u=t(3504),p=t(5751),h=t(2039),m=t(8138),x=t(348),j=t(184),f=p.ZP.div(s||(s=(0,a.Z)(["\n    cursor: pointer;\n    &:hover p {\n        display: block;\n    }\n"]))),g=p.ZP.p(r||(r=(0,a.Z)(['\n    display: none;\n    border-radius: 6px;\n    padding: 4px;\n    position: absolute;\n    background: #fff;\n    border: 1px solid rgba(0,0,0,.5);\n    z-index: 111;\n    &::after {\n        content: "";\n        position: absolute;\n        height: 5px;\n        width: 5px;\n        background: #fff;\n        transform: rotate(45deg);\n        border-top: 1px solid rgba(0,0,0,.5);\n        border-left: 1px solid rgba(0,0,0,.5);\n        top: -3px;\n        left: 10px;\n    }\n'])));n.default=(0,d.$j)((function(e){return{appointments:e.appointments}}),(function(e){return{fetchAppointments:function(n,t){return e((0,x.jL)(n,t))},setAppointmentPage:function(n){return e((0,x.QS)(n))},setAppointmentsPerPage:function(n){return e((0,x.KE)(n))},searchingAppointments:function(n){return e((0,x.v4)(n))},searchAppointments:function(n,t){return e((0,x.CP)(n,t))}}}))((function(e){var n=e.fetchAppointments,t=e.appointments,s=e.setAppointmentPage,r=e.setAppointmentsPerPage,a=e.searchingAppointments,i=e.searchAppointments;return(0,o.useEffect)((function(){if(t.searchValue.length>0){var e=setTimeout((function(){i(t.currentPage,parseInt(t.perPage))}),1500);return function(){return clearTimeout(e)}}n(t.currentPage,parseInt(t.perPage))}),[t.currentPage,t.perPage,t.searchValue,n,i]),(0,o.useEffect)((function(){var e=setTimeout((function(){i(t.currentPage,parseInt(t.perPage))}),1500);return function(){return clearTimeout(e)}}),[t.searchValue,t.currentPage,t.perPage,i]),(0,j.jsxs)("div",{className:"content-wrapper",children:[(0,j.jsxs)("div",{className:"content-header",children:[(0,j.jsxs)("div",{className:"container-fluid",children:[(0,j.jsxs)("div",{className:"row mb-2",children:[(0,j.jsx)("div",{className:"col-sm-6",children:(0,j.jsx)("h1",{className:"m-0",children:"Listes des rendez-vous"})})," ",(0,j.jsx)("div",{className:"col-sm-6",children:(0,j.jsxs)("ol",{className:"breadcrumb float-sm-right",children:[(0,j.jsx)("li",{className:"breadcrumb-item",children:(0,j.jsx)(u.rU,{to:"/",children:"Rendez-vous"})}),(0,j.jsx)("li",{className:"breadcrumb-item active",children:"List"})]})})," "]})," "]})," "]}),(0,j.jsx)("section",{className:"content",children:(0,j.jsx)("div",{className:"container-fluid",children:(0,j.jsx)("div",{className:"row",children:(0,j.jsxs)("div",{className:"col-12",children:[(0,j.jsxs)("div",{className:"card",children:[(0,j.jsxs)("div",{className:"card-header",children:[(0,j.jsx)("h3",{className:"card-title",children:(0,j.jsxs)("select",{className:"form-control",style:{padding:"0.175rem",height:"calc(1.8125rem + 2px)"},onChange:function(e){r(e.target.value),s(1)},children:[(0,j.jsx)("option",{value:"5",children:"5"}),(0,j.jsx)("option",{value:"10",children:"10"}),(0,j.jsx)("option",{value:"15",children:"15"})]})}),(0,j.jsx)("div",{className:"card-tools",children:(0,j.jsxs)("div",{className:"input-group input-group-sm",children:[(0,j.jsx)("input",{type:"text",name:"table_search",className:"form-control float-right",placeholder:"Recherche",onChange:function(){var e=(0,c.Z)(l().mark((function e(n){return l().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a(n.target.value),s(1);case 2:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}()}),(0,j.jsx)("div",{className:"input-group-append",children:(0,j.jsxs)("button",{type:"submit",className:"btn btn-default",children:[!t.searching&&(0,j.jsx)("i",{className:"fas fa-search"}),t.searching&&(0,j.jsx)("div",{className:"spinner-border",role:"status",children:(0,j.jsx)("span",{className:"sr-only"})})]})})]})})]}),(0,j.jsxs)("div",{className:"card-body table-responsive p-0",children:[t.loading&&(0,j.jsx)(m.Z,{}),!t.loading&&t.appointments.length>0&&(0,j.jsxs)("table",{className:"table table-head-fixed text-nowrap",children:[(0,j.jsx)("thead",{children:(0,j.jsxs)("tr",{children:[(0,j.jsx)("th",{}),(0,j.jsx)("th",{children:"Lieu"}),(0,j.jsx)("th",{children:"Agent"}),(0,j.jsx)("th",{children:"Client"}),(0,j.jsx)("th",{})]})}),(0,j.jsx)("tbody",{children:t.appointments.map((function(e,n){return(0,j.jsxs)("tr",{children:[(0,j.jsx)("td",{children:t.currentPage*t.perPage-t.perPage+n+1}),(0,j.jsxs)("td",{children:[e.property_adresse,", ",e.property_postal_code," ",e.property_city]}),(0,j.jsxs)("td",{children:[e.a_first_name," ",e.a_first_name]}),(0,j.jsx)("td",{style:{position:"relative"},children:(0,j.jsxs)(f,{children:[e.lanlord_first_name," ",e.lanlord_last_name,(0,j.jsx)(g,{children:(0,j.jsx)("span",{children:e.lanlord_email})})]})}),(0,j.jsx)("td",{children:(0,j.jsx)(u.rU,{to:"/modifier/".concat(e.uuid,"/rendez-vous"),children:(0,j.jsx)("i",{className:"bi bi-pencil-square",style:{color:"#000"}})})})]},n)}))})]}),!t.loading&&0===t.appointments.length&&t.totalPages<=0&&(0,j.jsx)("div",{style:{margin:"0 auto",maxWidth:"900px",padding:"20px"},children:(0,j.jsx)("em",{style:{color:"red",textAlign:"center",fontSize:"30px"},children:"Oops aucun utilisateur n'a \xe9t\xe9 trouver dans la base de don\xe9es!."})})]})]}),!t.loading&&t.appointments.length>0&&(0,j.jsx)(h.Z,{currentPage:t.currentPage,onPageChange:s,itemsPerPage:t.perPage,length:t.totalPages})]})})})})]})}))}}]);
//# sourceMappingURL=434.ad7b9e70.chunk.js.map