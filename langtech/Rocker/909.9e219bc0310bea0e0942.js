(self.webpackChunkrocker=self.webpackChunkrocker||[]).push([[909],{5035:(t,e,r)=>{"use strict";r.d(e,{W:()=>n});var i=r(8512),o=r(2693),s=r(5366);let n=(()=>{class t{constructor(t){this.http=t,this.contributeurs$=new i.X([]),this.getContributeurs()}getContributeurs(){this.http.get("/api/utilisateurs/contributeurs",{observe:"response"}).subscribe({next:t=>{t.body&&(console.log(t.body),this.contributeurs$.next(t.body))}})}getContributeursWitCriteria(t,e){let r=new o.LE;return Object.keys(e).forEach(t=>{r=r.set(t,e[t])}),this.http.post("/api/utilisateurs/criteria",t,{params:r,observe:"response"})}deleteContributeur(t){return this.http.delete(`/api/utilisateurs/${t}`,{observe:"response"})}getBestContributor(t){return this.http.post("/api/traductions/best-contributor",t,{observe:"response"})}getNbreContributor(){return this.http.get("/api/utilisateurs/count-contributor",{observe:"response"})}getContributor(t){return this.http.get(`/api/utilisateurs/${t}`,{observe:"response"})}}return t.\u0275fac=function(e){return new(e||t)(s.LFG(o.eN))},t.\u0275prov=s.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()},7598:(t,e,r)=>{"use strict";r.d(e,{u:()=>n});var i=r(2693),o=r(8512),s=r(5366);let n=(()=>{class t{constructor(t){this.http=t,this.traductions$=new o.X([]),this.init()}init(){this.http.get("/api/traductions",{observe:"response"}).subscribe({next:t=>{t.body&&this.traductions$.next(t.body)}})}getTraductions(t,e){let r=new i.LE;return Object.keys(e).forEach(t=>{r=r.set(t,e[t])}),this.http.post("/api/traductions/criteria",t,{params:r,observe:"response"})}delete(t){return this.http.delete(`/api/traductions/${t}`,{observe:"response"})}getOne(t){return this.http.get(`/api/document/traduction?traductionId=${t}`,{observe:"response"})}onValide(t){return this.http.post("/api/traductions/validation",t,{observe:"response"})}onGetStatistiques(t){return this.http.post("/api/getStatistique",t,{observe:"response"})}getContributionByContributeur(t){return this.http.get(`/api/traductions-by-contibuteur/${t}`,{observe:"response"})}getContributionBySource(t){return this.http.get(`/api/traductions-by-source/${t}`,{observe:"response"})}getStatistique(){return this.http.get("/api/traductions-get-info-stats-mois",{observe:"response"})}getNbreSourceTranslated(){return this.http.get("/api/traductions/count-translated",{observe:"response"})}getTraductionsPerso(t,e){let r=new i.LE;return Object.keys(e).forEach(t=>{r=r.set(t,e[t])}),this.http.post("/api/traductions/count/criteria",t,{params:r,observe:"response"})}}return t.\u0275fac=function(e){return new(e||t)(s.LFG(i.eN))},t.\u0275prov=s.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()},6909:(t,e,r)=>{"use strict";r.r(e),r.d(e,{HomeModule:()=>m});var i=r(1116),o=r(5424),s=r(3980);class n{constructor(t,e){this.debut=t,this.fin=e}}var u=r(5366),a=r(1462),c=r(7598),d=r(5035),b=r(2169),h=r(8712);function g(t,e){if(1&t&&(u.TgZ(0,"tr"),u.TgZ(1,"td"),u._uU(2),u.qZA(),u.TgZ(3,"td"),u._uU(4),u.qZA(),u.TgZ(5,"td"),u._uU(6),u.qZA(),u.TgZ(7,"td"),u._uU(8),u.qZA(),u.TgZ(9,"td"),u._uU(10),u.qZA(),u.qZA()),2&t){const t=e.$implicit,r=u.oxw(2);u.xp6(2),u.Oqu(t.nom),u.xp6(2),u.Oqu(t.prenom),u.xp6(2),u.Oqu(t.email),u.xp6(2),u.Oqu(t.telephone),u.xp6(2),u.Oqu(r.pointFidelite)}}function p(t,e){if(1&t&&(u.TgZ(0,"div",38),u.TgZ(1,"table",39),u.TgZ(2,"thead",40),u.TgZ(3,"tr"),u.TgZ(4,"th"),u._uU(5,"Nom"),u.qZA(),u.TgZ(6,"th"),u._uU(7,"prenom"),u.qZA(),u.TgZ(8,"th"),u._uU(9,"email"),u.qZA(),u.TgZ(10,"th"),u._uU(11,"contact"),u.qZA(),u.TgZ(12,"th"),u._uU(13,"Point de fidelit\xe9"),u.qZA(),u.qZA(),u.qZA(),u.TgZ(14,"tbody"),u.YNc(15,g,11,5,"tr",41),u.qZA(),u.qZA(),u.qZA()),2&t){const t=u.oxw();u.xp6(15),u.Q6J("ngForOf",t.bestContributeurs)}}const Z=[{path:"",component:(()=>{class t{constructor(t,e,r,i){this.fb=t,this.contributionService=e,this.contributeurService=r,this.sourceService=i,this.traductionAttentes=[],this.traductionRejetees=[],this.traductionValidees=[],this.highcharts=s,this.donneesState=[],this.nbreTraduit=0,this.nbreSourceDonne=0,this.nbreContributor=0,this.bestContributeurs=[],this.pointFidelite=0}ngOnInit(){$.getScript("./assets/js/deafult-dashboard.js"),this.getNbreContributor(),this.getNbreSourceDonnee(),this.getNbreSourceTranslated(),this.getSatistique(),this.initSearchForm()}onResetSearchForm(){}onSearch(){this.getBestContributeur()}initSearchForm(){this.formSearch=this.fb.group({dateDebut:null,dateFin:null})}getSatistique(){this.contributionService.getStatistique().subscribe(t=>{t.body&&(this.donneesState=t.body,this.donneesState.forEach(t=>{}),this.donneesState.forEach((t,e)=>{this.traductionAttentes.push(t.nombreContributionEnattente),this.traductionValidees.push(t.nombreContributionValide),this.traductionRejetees.push(t.nombreContributionRejette)}),this.intialiser(),console.warn("this.donneesState ",this.traductionAttentes))})}intialiser(){this.data1=[{name:"traductions en attente",data:this.traductionAttentes},{name:"traductions rejet\xe9es",data:this.traductionRejetees},{name:"traductions accept\xe9es",data:this.traductionValidees}],this.chartOptions={chart:{type:"column",column:{pointPadding:0,borderWidth:0,groupPadding:0,shadow:!1}},title:{text:"Evolution des contributions par mois"},yAxis:{title:{text:"contributions"}},xAxis:{categories:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]},series:this.data1}}getBestContributeur(){const t=new n;t.debut=new Date(this.formSearch.get("dateDebut").value),t.fin=new Date(this.formSearch.get("dateFin").value),console.warn("data date",t),this.contributeurService.getBestContributor(t).subscribe(t=>{t.body&&(console.warn("bestContributeurs",t.body),this.bestContributeurs=t.body.utilisateurs,this.pointFidelite=t.body.pointFidelite)})}getNbreSourceTranslated(){this.contributionService.getNbreSourceTranslated().subscribe(t=>{t.body&&(this.nbreTraduit=t.body,console.warn("nbre traduit",this.nbreTraduit))})}getNbreSourceDonnee(){this.sourceService.getNbreSourceDonnee().subscribe(t=>{t.body&&(this.nbreSourceDonne=t.body)})}getNbreContributor(){this.contributeurService.getNbreContributor().subscribe(t=>{t.body&&(this.nbreContributor=t.body)})}}return t.\u0275fac=function(e){return new(e||t)(u.Y36(a.qu),u.Y36(c.u),u.Y36(d.W),u.Y36(b.t))},t.\u0275cmp=u.Xpm({type:t,selectors:[["app-home"]],decls:70,vars:7,consts:[[1,"row"],[1,"card","radius-10"],[1,"card-body"],[1,"text-center","text-primary","h2"],[1,"row","row-cols-1","row-cols-md-2","row-cols-xl-3"],[1,"col"],[1,"card","radius-10","border-start","border-0","border-3","border-info"],[1,"d-flex","align-items-center"],[1,"mb-0","text-secondary"],[1,"my-1","text-info"],[1,"mb-0","font-13"],[1,"widgets-icons-2","rounded-circle","bg-gradient-scooter","text-white","ms-auto"],[1,"bx","bx-lock"],[1,"card","radius-10","border-start","border-0","border-3","border-success"],[1,"my-1","text-success"],[1,"widgets-icons-2","rounded-circle","bg-gradient-ohhappiness","text-white","ms-auto"],[1,"bx","bx-lock-open"],[1,"card","radius-10","border-start","border-0","border-3","border-danger"],[1,"my-1","text-danger"],[1,"widgets-icons-2","rounded-circle","bg-gradient-bloody","text-white","ms-auto"],[1,"lni","lni-unlock"],[1,"card"],[1,"row","align-items-center"],[1,"col-lg-12","col-xl-12","h5","text-primary"],[3,"formGroup","ngSubmit"],[1,"col-md-3","mb-3"],["for","dateDebut",1,"col-form-label"],["type","date","name","dateDebut","formControlName","dateDebut","id","dateDebut",1,"form-control"],["for","dateFin",1,"col-form-label"],["type","date","name","dateFin","formControlName","dateFin","id","dateFin",1,"form-control"],[1,"col-md-6","mb-3","mt-4"],["type","reset",1,"btn","btn-outline-danger","radius-30","mx-3","mt-2",3,"click"],[1,"bx","bx-x-circle","mr-1"],["type","submit",1,"btn","btn-outline-success","radius-30","mt-2"],[1,"bx","bx-search"],["class","table-responsive",4,"ngIf"],[1,"col-12"],[2,"width","100%","height","400px","display","block",3,"Highcharts","options"],[1,"table-responsive"],[1,"table","mb-0"],[1,"table-light"],[4,"ngFor","ngForOf"]],template:function(t,e){1&t&&(u.TgZ(0,"div",0),u.TgZ(1,"div",1),u.TgZ(2,"div",2),u.TgZ(3,"div",3),u._uU(4,"LangTechApp"),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u.TgZ(5,"div",4),u.TgZ(6,"div",5),u.TgZ(7,"div",6),u.TgZ(8,"div",2),u.TgZ(9,"div",7),u.TgZ(10,"div"),u.TgZ(11,"p",8),u._uU(12,"Total des contributeurs"),u.qZA(),u.TgZ(13,"h4",9),u._uU(14),u.qZA(),u._UZ(15,"p",10),u.qZA(),u.TgZ(16,"div",11),u._UZ(17,"i",12),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u.TgZ(18,"div",5),u.TgZ(19,"div",13),u.TgZ(20,"div",2),u.TgZ(21,"div",7),u.TgZ(22,"div"),u.TgZ(23,"p",8),u._uU(24,"Total des donn\xe9es sources"),u.qZA(),u.TgZ(25,"h4",14),u._uU(26),u.qZA(),u._UZ(27,"p",10),u.qZA(),u.TgZ(28,"div",15),u._UZ(29,"i",16),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u.TgZ(30,"div",5),u.TgZ(31,"div",17),u.TgZ(32,"div",2),u.TgZ(33,"div",7),u.TgZ(34,"div"),u.TgZ(35,"p",8),u._uU(36,"Total des sources traduites"),u.qZA(),u.TgZ(37,"h4",18),u._uU(38),u.qZA(),u._UZ(39,"p",10),u.qZA(),u.TgZ(40,"div",19),u._UZ(41,"i",20),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u.TgZ(42,"div",21),u.TgZ(43,"div",2),u.TgZ(44,"div",22),u.TgZ(45,"div",23),u._uU(46," Rechercher le meilleur contributeur de la periode "),u.qZA(),u.qZA(),u._UZ(47,"hr"),u.TgZ(48,"div",22),u.TgZ(49,"form",24),u.NdJ("ngSubmit",function(){return e.onSearch()}),u.TgZ(50,"div",0),u.TgZ(51,"div",25),u.TgZ(52,"label",26),u._uU(53,"Date debut"),u.qZA(),u._UZ(54,"input",27),u.qZA(),u.TgZ(55,"div",25),u.TgZ(56,"label",28),u._uU(57,"Date fin"),u.qZA(),u._UZ(58,"input",29),u.qZA(),u.TgZ(59,"div",30),u.TgZ(60,"button",31),u.NdJ("click",function(){return e.onResetSearchForm()}),u._UZ(61,"i",32),u._uU(62," R\xe9nitialiser "),u.qZA(),u.TgZ(63,"button",33),u._UZ(64,"i",34),u._uU(65," Rechercher "),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u.YNc(66,p,16,1,"div",35),u.qZA(),u.qZA(),u.TgZ(67,"div",0),u.TgZ(68,"div",36),u._UZ(69,"highcharts-chart",37),u.qZA(),u.qZA()),2&t&&(u.xp6(14),u.Oqu(e.nbreContributor),u.xp6(12),u.Oqu(e.nbreSourceDonne),u.xp6(12),u.Oqu(e.nbreTraduit),u.xp6(11),u.Q6J("formGroup",e.formSearch),u.xp6(17),u.Q6J("ngIf",e.bestContributeurs.length>0),u.xp6(3),u.Q6J("Highcharts",e.highcharts)("options",e.chartOptions))},directives:[a._Y,a.JL,a.sg,a.Fj,a.JJ,a.u,i.O5,h.x,i.sg],styles:[""]}),t})()}];let l=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=u.oAB({type:t}),t.\u0275inj=u.cJS({imports:[[o.Bz.forChild(Z)],o.Bz]}),t})(),m=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=u.oAB({type:t}),t.\u0275inj=u.cJS({imports:[[i.ez,l,h.l]]}),t})()}}]);