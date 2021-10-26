(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~handy-modules-dev-dev-module~modules-auth-auth-module~modules-pdf-templates-pdf-templates-mo~c2f6e977"],{

/***/ "./node_modules/mime/Mime.js":
/*!***********************************!*\
  !*** ./node_modules/mime/Mime.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @param typeMap [Object] Map of MIME type -> Array[extensions]
 * @param ...
 */
function Mime() {
  this._types = Object.create(null);
  this._extensions = Object.create(null);

  for (var i = 0; i < arguments.length; i++) {
    this.define(arguments[i]);
  }

  this.define = this.define.bind(this);
  this.getType = this.getType.bind(this);
  this.getExtension = this.getExtension.bind(this);
}

/**
 * Define mimetype -> extension mappings.  Each key is a mime-type that maps
 * to an array of extensions associated with the type.  The first extension is
 * used as the default extension for the type.
 *
 * e.g. mime.define({'audio/ogg', ['oga', 'ogg', 'spx']});
 *
 * If a type declares an extension that has already been defined, an error will
 * be thrown.  To suppress this error and force the extension to be associated
 * with the new type, pass `force`=true.  Alternatively, you may prefix the
 * extension with "*" to map the type to extension, without mapping the
 * extension to the type.
 *
 * e.g. mime.define({'audio/wav', ['wav']}, {'audio/x-wav', ['*wav']});
 *
 *
 * @param map (Object) type definitions
 * @param force (Boolean) if true, force overriding of existing definitions
 */
Mime.prototype.define = function(typeMap, force) {
  for (var type in typeMap) {
    var extensions = typeMap[type].map(function(t) {return t.toLowerCase()});
    type = type.toLowerCase();

    for (var i = 0; i < extensions.length; i++) {
      var ext = extensions[i];

      // '*' prefix = not the preferred type for this extension.  So fixup the
      // extension, and skip it.
      if (ext[0] == '*') {
        continue;
      }

      if (!force && (ext in this._types)) {
        throw new Error(
          'Attempt to change mapping for "' + ext +
          '" extension from "' + this._types[ext] + '" to "' + type +
          '". Pass `force=true` to allow this, otherwise remove "' + ext +
          '" from the list of extensions for "' + type + '".'
        );
      }

      this._types[ext] = type;
    }

    // Use first extension as default
    if (force || !this._extensions[type]) {
      var ext = extensions[0];
      this._extensions[type] = (ext[0] != '*') ? ext : ext.substr(1)
    }
  }
};

/**
 * Lookup a mime type based on extension
 */
Mime.prototype.getType = function(path) {
  path = String(path);
  var last = path.replace(/^.*[/\\]/, '').toLowerCase();
  var ext = last.replace(/^.*\./, '').toLowerCase();

  var hasPath = last.length < path.length;
  var hasDot = ext.length < last.length - 1;

  return (hasDot || !hasPath) && this._types[ext] || null;
};

/**
 * Return file extension associated with a mime type
 */
Mime.prototype.getExtension = function(type) {
  type = /^\s*([^;\s]*)/.test(type) && RegExp.$1;
  return type && this._extensions[type.toLowerCase()] || null;
};

module.exports = Mime;


/***/ }),

/***/ "./node_modules/mime/index.js":
/*!************************************!*\
  !*** ./node_modules/mime/index.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Mime = __webpack_require__(/*! ./Mime */ "./node_modules/mime/Mime.js");
module.exports = new Mime(__webpack_require__(/*! ./types/standard */ "./node_modules/mime/types/standard.js"), __webpack_require__(/*! ./types/other */ "./node_modules/mime/types/other.js"));


/***/ }),

/***/ "./node_modules/mime/types/other.js":
/*!******************************************!*\
  !*** ./node_modules/mime/types/other.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {"application/prs.cww":["cww"],"application/vnd.1000minds.decision-model+xml":["1km"],"application/vnd.3gpp.pic-bw-large":["plb"],"application/vnd.3gpp.pic-bw-small":["psb"],"application/vnd.3gpp.pic-bw-var":["pvb"],"application/vnd.3gpp2.tcap":["tcap"],"application/vnd.3m.post-it-notes":["pwn"],"application/vnd.accpac.simply.aso":["aso"],"application/vnd.accpac.simply.imp":["imp"],"application/vnd.acucobol":["acu"],"application/vnd.acucorp":["atc","acutc"],"application/vnd.adobe.air-application-installer-package+zip":["air"],"application/vnd.adobe.formscentral.fcdt":["fcdt"],"application/vnd.adobe.fxp":["fxp","fxpl"],"application/vnd.adobe.xdp+xml":["xdp"],"application/vnd.adobe.xfdf":["xfdf"],"application/vnd.ahead.space":["ahead"],"application/vnd.airzip.filesecure.azf":["azf"],"application/vnd.airzip.filesecure.azs":["azs"],"application/vnd.amazon.ebook":["azw"],"application/vnd.americandynamics.acc":["acc"],"application/vnd.amiga.ami":["ami"],"application/vnd.android.package-archive":["apk"],"application/vnd.anser-web-certificate-issue-initiation":["cii"],"application/vnd.anser-web-funds-transfer-initiation":["fti"],"application/vnd.antix.game-component":["atx"],"application/vnd.apple.installer+xml":["mpkg"],"application/vnd.apple.keynote":["keynote"],"application/vnd.apple.mpegurl":["m3u8"],"application/vnd.apple.numbers":["numbers"],"application/vnd.apple.pages":["pages"],"application/vnd.apple.pkpass":["pkpass"],"application/vnd.aristanetworks.swi":["swi"],"application/vnd.astraea-software.iota":["iota"],"application/vnd.audiograph":["aep"],"application/vnd.balsamiq.bmml+xml":["bmml"],"application/vnd.blueice.multipass":["mpm"],"application/vnd.bmi":["bmi"],"application/vnd.businessobjects":["rep"],"application/vnd.chemdraw+xml":["cdxml"],"application/vnd.chipnuts.karaoke-mmd":["mmd"],"application/vnd.cinderella":["cdy"],"application/vnd.citationstyles.style+xml":["csl"],"application/vnd.claymore":["cla"],"application/vnd.cloanto.rp9":["rp9"],"application/vnd.clonk.c4group":["c4g","c4d","c4f","c4p","c4u"],"application/vnd.cluetrust.cartomobile-config":["c11amc"],"application/vnd.cluetrust.cartomobile-config-pkg":["c11amz"],"application/vnd.commonspace":["csp"],"application/vnd.contact.cmsg":["cdbcmsg"],"application/vnd.cosmocaller":["cmc"],"application/vnd.crick.clicker":["clkx"],"application/vnd.crick.clicker.keyboard":["clkk"],"application/vnd.crick.clicker.palette":["clkp"],"application/vnd.crick.clicker.template":["clkt"],"application/vnd.crick.clicker.wordbank":["clkw"],"application/vnd.criticaltools.wbs+xml":["wbs"],"application/vnd.ctc-posml":["pml"],"application/vnd.cups-ppd":["ppd"],"application/vnd.curl.car":["car"],"application/vnd.curl.pcurl":["pcurl"],"application/vnd.dart":["dart"],"application/vnd.data-vision.rdz":["rdz"],"application/vnd.dece.data":["uvf","uvvf","uvd","uvvd"],"application/vnd.dece.ttml+xml":["uvt","uvvt"],"application/vnd.dece.unspecified":["uvx","uvvx"],"application/vnd.dece.zip":["uvz","uvvz"],"application/vnd.denovo.fcselayout-link":["fe_launch"],"application/vnd.dna":["dna"],"application/vnd.dolby.mlp":["mlp"],"application/vnd.dpgraph":["dpg"],"application/vnd.dreamfactory":["dfac"],"application/vnd.ds-keypoint":["kpxx"],"application/vnd.dvb.ait":["ait"],"application/vnd.dvb.service":["svc"],"application/vnd.dynageo":["geo"],"application/vnd.ecowin.chart":["mag"],"application/vnd.enliven":["nml"],"application/vnd.epson.esf":["esf"],"application/vnd.epson.msf":["msf"],"application/vnd.epson.quickanime":["qam"],"application/vnd.epson.salt":["slt"],"application/vnd.epson.ssf":["ssf"],"application/vnd.eszigno3+xml":["es3","et3"],"application/vnd.ezpix-album":["ez2"],"application/vnd.ezpix-package":["ez3"],"application/vnd.fdf":["fdf"],"application/vnd.fdsn.mseed":["mseed"],"application/vnd.fdsn.seed":["seed","dataless"],"application/vnd.flographit":["gph"],"application/vnd.fluxtime.clip":["ftc"],"application/vnd.framemaker":["fm","frame","maker","book"],"application/vnd.frogans.fnc":["fnc"],"application/vnd.frogans.ltf":["ltf"],"application/vnd.fsc.weblaunch":["fsc"],"application/vnd.fujitsu.oasys":["oas"],"application/vnd.fujitsu.oasys2":["oa2"],"application/vnd.fujitsu.oasys3":["oa3"],"application/vnd.fujitsu.oasysgp":["fg5"],"application/vnd.fujitsu.oasysprs":["bh2"],"application/vnd.fujixerox.ddd":["ddd"],"application/vnd.fujixerox.docuworks":["xdw"],"application/vnd.fujixerox.docuworks.binder":["xbd"],"application/vnd.fuzzysheet":["fzs"],"application/vnd.genomatix.tuxedo":["txd"],"application/vnd.geogebra.file":["ggb"],"application/vnd.geogebra.tool":["ggt"],"application/vnd.geometry-explorer":["gex","gre"],"application/vnd.geonext":["gxt"],"application/vnd.geoplan":["g2w"],"application/vnd.geospace":["g3w"],"application/vnd.gmx":["gmx"],"application/vnd.google-apps.document":["gdoc"],"application/vnd.google-apps.presentation":["gslides"],"application/vnd.google-apps.spreadsheet":["gsheet"],"application/vnd.google-earth.kml+xml":["kml"],"application/vnd.google-earth.kmz":["kmz"],"application/vnd.grafeq":["gqf","gqs"],"application/vnd.groove-account":["gac"],"application/vnd.groove-help":["ghf"],"application/vnd.groove-identity-message":["gim"],"application/vnd.groove-injector":["grv"],"application/vnd.groove-tool-message":["gtm"],"application/vnd.groove-tool-template":["tpl"],"application/vnd.groove-vcard":["vcg"],"application/vnd.hal+xml":["hal"],"application/vnd.handheld-entertainment+xml":["zmm"],"application/vnd.hbci":["hbci"],"application/vnd.hhe.lesson-player":["les"],"application/vnd.hp-hpgl":["hpgl"],"application/vnd.hp-hpid":["hpid"],"application/vnd.hp-hps":["hps"],"application/vnd.hp-jlyt":["jlt"],"application/vnd.hp-pcl":["pcl"],"application/vnd.hp-pclxl":["pclxl"],"application/vnd.hydrostatix.sof-data":["sfd-hdstx"],"application/vnd.ibm.minipay":["mpy"],"application/vnd.ibm.modcap":["afp","listafp","list3820"],"application/vnd.ibm.rights-management":["irm"],"application/vnd.ibm.secure-container":["sc"],"application/vnd.iccprofile":["icc","icm"],"application/vnd.igloader":["igl"],"application/vnd.immervision-ivp":["ivp"],"application/vnd.immervision-ivu":["ivu"],"application/vnd.insors.igm":["igm"],"application/vnd.intercon.formnet":["xpw","xpx"],"application/vnd.intergeo":["i2g"],"application/vnd.intu.qbo":["qbo"],"application/vnd.intu.qfx":["qfx"],"application/vnd.ipunplugged.rcprofile":["rcprofile"],"application/vnd.irepository.package+xml":["irp"],"application/vnd.is-xpr":["xpr"],"application/vnd.isac.fcs":["fcs"],"application/vnd.jam":["jam"],"application/vnd.jcp.javame.midlet-rms":["rms"],"application/vnd.jisp":["jisp"],"application/vnd.joost.joda-archive":["joda"],"application/vnd.kahootz":["ktz","ktr"],"application/vnd.kde.karbon":["karbon"],"application/vnd.kde.kchart":["chrt"],"application/vnd.kde.kformula":["kfo"],"application/vnd.kde.kivio":["flw"],"application/vnd.kde.kontour":["kon"],"application/vnd.kde.kpresenter":["kpr","kpt"],"application/vnd.kde.kspread":["ksp"],"application/vnd.kde.kword":["kwd","kwt"],"application/vnd.kenameaapp":["htke"],"application/vnd.kidspiration":["kia"],"application/vnd.kinar":["kne","knp"],"application/vnd.koan":["skp","skd","skt","skm"],"application/vnd.kodak-descriptor":["sse"],"application/vnd.las.las+xml":["lasxml"],"application/vnd.llamagraphics.life-balance.desktop":["lbd"],"application/vnd.llamagraphics.life-balance.exchange+xml":["lbe"],"application/vnd.lotus-1-2-3":["123"],"application/vnd.lotus-approach":["apr"],"application/vnd.lotus-freelance":["pre"],"application/vnd.lotus-notes":["nsf"],"application/vnd.lotus-organizer":["org"],"application/vnd.lotus-screencam":["scm"],"application/vnd.lotus-wordpro":["lwp"],"application/vnd.macports.portpkg":["portpkg"],"application/vnd.mcd":["mcd"],"application/vnd.medcalcdata":["mc1"],"application/vnd.mediastation.cdkey":["cdkey"],"application/vnd.mfer":["mwf"],"application/vnd.mfmp":["mfm"],"application/vnd.micrografx.flo":["flo"],"application/vnd.micrografx.igx":["igx"],"application/vnd.mif":["mif"],"application/vnd.mobius.daf":["daf"],"application/vnd.mobius.dis":["dis"],"application/vnd.mobius.mbk":["mbk"],"application/vnd.mobius.mqy":["mqy"],"application/vnd.mobius.msl":["msl"],"application/vnd.mobius.plc":["plc"],"application/vnd.mobius.txf":["txf"],"application/vnd.mophun.application":["mpn"],"application/vnd.mophun.certificate":["mpc"],"application/vnd.mozilla.xul+xml":["xul"],"application/vnd.ms-artgalry":["cil"],"application/vnd.ms-cab-compressed":["cab"],"application/vnd.ms-excel":["xls","xlm","xla","xlc","xlt","xlw"],"application/vnd.ms-excel.addin.macroenabled.12":["xlam"],"application/vnd.ms-excel.sheet.binary.macroenabled.12":["xlsb"],"application/vnd.ms-excel.sheet.macroenabled.12":["xlsm"],"application/vnd.ms-excel.template.macroenabled.12":["xltm"],"application/vnd.ms-fontobject":["eot"],"application/vnd.ms-htmlhelp":["chm"],"application/vnd.ms-ims":["ims"],"application/vnd.ms-lrm":["lrm"],"application/vnd.ms-officetheme":["thmx"],"application/vnd.ms-outlook":["msg"],"application/vnd.ms-pki.seccat":["cat"],"application/vnd.ms-pki.stl":["*stl"],"application/vnd.ms-powerpoint":["ppt","pps","pot"],"application/vnd.ms-powerpoint.addin.macroenabled.12":["ppam"],"application/vnd.ms-powerpoint.presentation.macroenabled.12":["pptm"],"application/vnd.ms-powerpoint.slide.macroenabled.12":["sldm"],"application/vnd.ms-powerpoint.slideshow.macroenabled.12":["ppsm"],"application/vnd.ms-powerpoint.template.macroenabled.12":["potm"],"application/vnd.ms-project":["mpp","mpt"],"application/vnd.ms-word.document.macroenabled.12":["docm"],"application/vnd.ms-word.template.macroenabled.12":["dotm"],"application/vnd.ms-works":["wps","wks","wcm","wdb"],"application/vnd.ms-wpl":["wpl"],"application/vnd.ms-xpsdocument":["xps"],"application/vnd.mseq":["mseq"],"application/vnd.musician":["mus"],"application/vnd.muvee.style":["msty"],"application/vnd.mynfc":["taglet"],"application/vnd.neurolanguage.nlu":["nlu"],"application/vnd.nitf":["ntf","nitf"],"application/vnd.noblenet-directory":["nnd"],"application/vnd.noblenet-sealer":["nns"],"application/vnd.noblenet-web":["nnw"],"application/vnd.nokia.n-gage.ac+xml":["*ac"],"application/vnd.nokia.n-gage.data":["ngdat"],"application/vnd.nokia.n-gage.symbian.install":["n-gage"],"application/vnd.nokia.radio-preset":["rpst"],"application/vnd.nokia.radio-presets":["rpss"],"application/vnd.novadigm.edm":["edm"],"application/vnd.novadigm.edx":["edx"],"application/vnd.novadigm.ext":["ext"],"application/vnd.oasis.opendocument.chart":["odc"],"application/vnd.oasis.opendocument.chart-template":["otc"],"application/vnd.oasis.opendocument.database":["odb"],"application/vnd.oasis.opendocument.formula":["odf"],"application/vnd.oasis.opendocument.formula-template":["odft"],"application/vnd.oasis.opendocument.graphics":["odg"],"application/vnd.oasis.opendocument.graphics-template":["otg"],"application/vnd.oasis.opendocument.image":["odi"],"application/vnd.oasis.opendocument.image-template":["oti"],"application/vnd.oasis.opendocument.presentation":["odp"],"application/vnd.oasis.opendocument.presentation-template":["otp"],"application/vnd.oasis.opendocument.spreadsheet":["ods"],"application/vnd.oasis.opendocument.spreadsheet-template":["ots"],"application/vnd.oasis.opendocument.text":["odt"],"application/vnd.oasis.opendocument.text-master":["odm"],"application/vnd.oasis.opendocument.text-template":["ott"],"application/vnd.oasis.opendocument.text-web":["oth"],"application/vnd.olpc-sugar":["xo"],"application/vnd.oma.dd2+xml":["dd2"],"application/vnd.openblox.game+xml":["obgx"],"application/vnd.openofficeorg.extension":["oxt"],"application/vnd.openstreetmap.data+xml":["osm"],"application/vnd.openxmlformats-officedocument.presentationml.presentation":["pptx"],"application/vnd.openxmlformats-officedocument.presentationml.slide":["sldx"],"application/vnd.openxmlformats-officedocument.presentationml.slideshow":["ppsx"],"application/vnd.openxmlformats-officedocument.presentationml.template":["potx"],"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":["xlsx"],"application/vnd.openxmlformats-officedocument.spreadsheetml.template":["xltx"],"application/vnd.openxmlformats-officedocument.wordprocessingml.document":["docx"],"application/vnd.openxmlformats-officedocument.wordprocessingml.template":["dotx"],"application/vnd.osgeo.mapguide.package":["mgp"],"application/vnd.osgi.dp":["dp"],"application/vnd.osgi.subsystem":["esa"],"application/vnd.palm":["pdb","pqa","oprc"],"application/vnd.pawaafile":["paw"],"application/vnd.pg.format":["str"],"application/vnd.pg.osasli":["ei6"],"application/vnd.picsel":["efif"],"application/vnd.pmi.widget":["wg"],"application/vnd.pocketlearn":["plf"],"application/vnd.powerbuilder6":["pbd"],"application/vnd.previewsystems.box":["box"],"application/vnd.proteus.magazine":["mgz"],"application/vnd.publishare-delta-tree":["qps"],"application/vnd.pvi.ptid1":["ptid"],"application/vnd.quark.quarkxpress":["qxd","qxt","qwd","qwt","qxl","qxb"],"application/vnd.realvnc.bed":["bed"],"application/vnd.recordare.musicxml":["mxl"],"application/vnd.recordare.musicxml+xml":["musicxml"],"application/vnd.rig.cryptonote":["cryptonote"],"application/vnd.rim.cod":["cod"],"application/vnd.rn-realmedia":["rm"],"application/vnd.rn-realmedia-vbr":["rmvb"],"application/vnd.route66.link66+xml":["link66"],"application/vnd.sailingtracker.track":["st"],"application/vnd.seemail":["see"],"application/vnd.sema":["sema"],"application/vnd.semd":["semd"],"application/vnd.semf":["semf"],"application/vnd.shana.informed.formdata":["ifm"],"application/vnd.shana.informed.formtemplate":["itp"],"application/vnd.shana.informed.interchange":["iif"],"application/vnd.shana.informed.package":["ipk"],"application/vnd.simtech-mindmapper":["twd","twds"],"application/vnd.smaf":["mmf"],"application/vnd.smart.teacher":["teacher"],"application/vnd.software602.filler.form+xml":["fo"],"application/vnd.solent.sdkm+xml":["sdkm","sdkd"],"application/vnd.spotfire.dxp":["dxp"],"application/vnd.spotfire.sfs":["sfs"],"application/vnd.stardivision.calc":["sdc"],"application/vnd.stardivision.draw":["sda"],"application/vnd.stardivision.impress":["sdd"],"application/vnd.stardivision.math":["smf"],"application/vnd.stardivision.writer":["sdw","vor"],"application/vnd.stardivision.writer-global":["sgl"],"application/vnd.stepmania.package":["smzip"],"application/vnd.stepmania.stepchart":["sm"],"application/vnd.sun.wadl+xml":["wadl"],"application/vnd.sun.xml.calc":["sxc"],"application/vnd.sun.xml.calc.template":["stc"],"application/vnd.sun.xml.draw":["sxd"],"application/vnd.sun.xml.draw.template":["std"],"application/vnd.sun.xml.impress":["sxi"],"application/vnd.sun.xml.impress.template":["sti"],"application/vnd.sun.xml.math":["sxm"],"application/vnd.sun.xml.writer":["sxw"],"application/vnd.sun.xml.writer.global":["sxg"],"application/vnd.sun.xml.writer.template":["stw"],"application/vnd.sus-calendar":["sus","susp"],"application/vnd.svd":["svd"],"application/vnd.symbian.install":["sis","sisx"],"application/vnd.syncml+xml":["xsm"],"application/vnd.syncml.dm+wbxml":["bdm"],"application/vnd.syncml.dm+xml":["xdm"],"application/vnd.syncml.dmddf+xml":["ddf"],"application/vnd.tao.intent-module-archive":["tao"],"application/vnd.tcpdump.pcap":["pcap","cap","dmp"],"application/vnd.tmobile-livetv":["tmo"],"application/vnd.trid.tpt":["tpt"],"application/vnd.triscape.mxs":["mxs"],"application/vnd.trueapp":["tra"],"application/vnd.ufdl":["ufd","ufdl"],"application/vnd.uiq.theme":["utz"],"application/vnd.umajin":["umj"],"application/vnd.unity":["unityweb"],"application/vnd.uoml+xml":["uoml"],"application/vnd.vcx":["vcx"],"application/vnd.visio":["vsd","vst","vss","vsw"],"application/vnd.visionary":["vis"],"application/vnd.vsf":["vsf"],"application/vnd.wap.wbxml":["wbxml"],"application/vnd.wap.wmlc":["wmlc"],"application/vnd.wap.wmlscriptc":["wmlsc"],"application/vnd.webturbo":["wtb"],"application/vnd.wolfram.player":["nbp"],"application/vnd.wordperfect":["wpd"],"application/vnd.wqd":["wqd"],"application/vnd.wt.stf":["stf"],"application/vnd.xara":["xar"],"application/vnd.xfdl":["xfdl"],"application/vnd.yamaha.hv-dic":["hvd"],"application/vnd.yamaha.hv-script":["hvs"],"application/vnd.yamaha.hv-voice":["hvp"],"application/vnd.yamaha.openscoreformat":["osf"],"application/vnd.yamaha.openscoreformat.osfpvg+xml":["osfpvg"],"application/vnd.yamaha.smaf-audio":["saf"],"application/vnd.yamaha.smaf-phrase":["spf"],"application/vnd.yellowriver-custom-menu":["cmp"],"application/vnd.zul":["zir","zirz"],"application/vnd.zzazz.deck+xml":["zaz"],"application/x-7z-compressed":["7z"],"application/x-abiword":["abw"],"application/x-ace-compressed":["ace"],"application/x-apple-diskimage":["*dmg"],"application/x-arj":["arj"],"application/x-authorware-bin":["aab","x32","u32","vox"],"application/x-authorware-map":["aam"],"application/x-authorware-seg":["aas"],"application/x-bcpio":["bcpio"],"application/x-bdoc":["*bdoc"],"application/x-bittorrent":["torrent"],"application/x-blorb":["blb","blorb"],"application/x-bzip":["bz"],"application/x-bzip2":["bz2","boz"],"application/x-cbr":["cbr","cba","cbt","cbz","cb7"],"application/x-cdlink":["vcd"],"application/x-cfs-compressed":["cfs"],"application/x-chat":["chat"],"application/x-chess-pgn":["pgn"],"application/x-chrome-extension":["crx"],"application/x-cocoa":["cco"],"application/x-conference":["nsc"],"application/x-cpio":["cpio"],"application/x-csh":["csh"],"application/x-debian-package":["*deb","udeb"],"application/x-dgc-compressed":["dgc"],"application/x-director":["dir","dcr","dxr","cst","cct","cxt","w3d","fgd","swa"],"application/x-doom":["wad"],"application/x-dtbncx+xml":["ncx"],"application/x-dtbook+xml":["dtb"],"application/x-dtbresource+xml":["res"],"application/x-dvi":["dvi"],"application/x-envoy":["evy"],"application/x-eva":["eva"],"application/x-font-bdf":["bdf"],"application/x-font-ghostscript":["gsf"],"application/x-font-linux-psf":["psf"],"application/x-font-pcf":["pcf"],"application/x-font-snf":["snf"],"application/x-font-type1":["pfa","pfb","pfm","afm"],"application/x-freearc":["arc"],"application/x-futuresplash":["spl"],"application/x-gca-compressed":["gca"],"application/x-glulx":["ulx"],"application/x-gnumeric":["gnumeric"],"application/x-gramps-xml":["gramps"],"application/x-gtar":["gtar"],"application/x-hdf":["hdf"],"application/x-httpd-php":["php"],"application/x-install-instructions":["install"],"application/x-iso9660-image":["*iso"],"application/x-java-archive-diff":["jardiff"],"application/x-java-jnlp-file":["jnlp"],"application/x-keepass2":["kdbx"],"application/x-latex":["latex"],"application/x-lua-bytecode":["luac"],"application/x-lzh-compressed":["lzh","lha"],"application/x-makeself":["run"],"application/x-mie":["mie"],"application/x-mobipocket-ebook":["prc","mobi"],"application/x-ms-application":["application"],"application/x-ms-shortcut":["lnk"],"application/x-ms-wmd":["wmd"],"application/x-ms-wmz":["wmz"],"application/x-ms-xbap":["xbap"],"application/x-msaccess":["mdb"],"application/x-msbinder":["obd"],"application/x-mscardfile":["crd"],"application/x-msclip":["clp"],"application/x-msdos-program":["*exe"],"application/x-msdownload":["*exe","*dll","com","bat","*msi"],"application/x-msmediaview":["mvb","m13","m14"],"application/x-msmetafile":["*wmf","*wmz","*emf","emz"],"application/x-msmoney":["mny"],"application/x-mspublisher":["pub"],"application/x-msschedule":["scd"],"application/x-msterminal":["trm"],"application/x-mswrite":["wri"],"application/x-netcdf":["nc","cdf"],"application/x-ns-proxy-autoconfig":["pac"],"application/x-nzb":["nzb"],"application/x-perl":["pl","pm"],"application/x-pilot":["*prc","*pdb"],"application/x-pkcs12":["p12","pfx"],"application/x-pkcs7-certificates":["p7b","spc"],"application/x-pkcs7-certreqresp":["p7r"],"application/x-rar-compressed":["rar"],"application/x-redhat-package-manager":["rpm"],"application/x-research-info-systems":["ris"],"application/x-sea":["sea"],"application/x-sh":["sh"],"application/x-shar":["shar"],"application/x-shockwave-flash":["swf"],"application/x-silverlight-app":["xap"],"application/x-sql":["sql"],"application/x-stuffit":["sit"],"application/x-stuffitx":["sitx"],"application/x-subrip":["srt"],"application/x-sv4cpio":["sv4cpio"],"application/x-sv4crc":["sv4crc"],"application/x-t3vm-image":["t3"],"application/x-tads":["gam"],"application/x-tar":["tar"],"application/x-tcl":["tcl","tk"],"application/x-tex":["tex"],"application/x-tex-tfm":["tfm"],"application/x-texinfo":["texinfo","texi"],"application/x-tgif":["*obj"],"application/x-ustar":["ustar"],"application/x-virtualbox-hdd":["hdd"],"application/x-virtualbox-ova":["ova"],"application/x-virtualbox-ovf":["ovf"],"application/x-virtualbox-vbox":["vbox"],"application/x-virtualbox-vbox-extpack":["vbox-extpack"],"application/x-virtualbox-vdi":["vdi"],"application/x-virtualbox-vhd":["vhd"],"application/x-virtualbox-vmdk":["vmdk"],"application/x-wais-source":["src"],"application/x-web-app-manifest+json":["webapp"],"application/x-x509-ca-cert":["der","crt","pem"],"application/x-xfig":["fig"],"application/x-xliff+xml":["*xlf"],"application/x-xpinstall":["xpi"],"application/x-xz":["xz"],"application/x-zmachine":["z1","z2","z3","z4","z5","z6","z7","z8"],"audio/vnd.dece.audio":["uva","uvva"],"audio/vnd.digital-winds":["eol"],"audio/vnd.dra":["dra"],"audio/vnd.dts":["dts"],"audio/vnd.dts.hd":["dtshd"],"audio/vnd.lucent.voice":["lvp"],"audio/vnd.ms-playready.media.pya":["pya"],"audio/vnd.nuera.ecelp4800":["ecelp4800"],"audio/vnd.nuera.ecelp7470":["ecelp7470"],"audio/vnd.nuera.ecelp9600":["ecelp9600"],"audio/vnd.rip":["rip"],"audio/x-aac":["aac"],"audio/x-aiff":["aif","aiff","aifc"],"audio/x-caf":["caf"],"audio/x-flac":["flac"],"audio/x-m4a":["*m4a"],"audio/x-matroska":["mka"],"audio/x-mpegurl":["m3u"],"audio/x-ms-wax":["wax"],"audio/x-ms-wma":["wma"],"audio/x-pn-realaudio":["ram","ra"],"audio/x-pn-realaudio-plugin":["rmp"],"audio/x-realaudio":["*ra"],"audio/x-wav":["*wav"],"chemical/x-cdx":["cdx"],"chemical/x-cif":["cif"],"chemical/x-cmdf":["cmdf"],"chemical/x-cml":["cml"],"chemical/x-csml":["csml"],"chemical/x-xyz":["xyz"],"image/prs.btif":["btif"],"image/prs.pti":["pti"],"image/vnd.adobe.photoshop":["psd"],"image/vnd.airzip.accelerator.azv":["azv"],"image/vnd.dece.graphic":["uvi","uvvi","uvg","uvvg"],"image/vnd.djvu":["djvu","djv"],"image/vnd.dvb.subtitle":["*sub"],"image/vnd.dwg":["dwg"],"image/vnd.dxf":["dxf"],"image/vnd.fastbidsheet":["fbs"],"image/vnd.fpx":["fpx"],"image/vnd.fst":["fst"],"image/vnd.fujixerox.edmics-mmr":["mmr"],"image/vnd.fujixerox.edmics-rlc":["rlc"],"image/vnd.microsoft.icon":["ico"],"image/vnd.ms-dds":["dds"],"image/vnd.ms-modi":["mdi"],"image/vnd.ms-photo":["wdp"],"image/vnd.net-fpx":["npx"],"image/vnd.tencent.tap":["tap"],"image/vnd.valve.source.texture":["vtf"],"image/vnd.wap.wbmp":["wbmp"],"image/vnd.xiff":["xif"],"image/vnd.zbrush.pcx":["pcx"],"image/x-3ds":["3ds"],"image/x-cmu-raster":["ras"],"image/x-cmx":["cmx"],"image/x-freehand":["fh","fhc","fh4","fh5","fh7"],"image/x-icon":["*ico"],"image/x-jng":["jng"],"image/x-mrsid-image":["sid"],"image/x-ms-bmp":["*bmp"],"image/x-pcx":["*pcx"],"image/x-pict":["pic","pct"],"image/x-portable-anymap":["pnm"],"image/x-portable-bitmap":["pbm"],"image/x-portable-graymap":["pgm"],"image/x-portable-pixmap":["ppm"],"image/x-rgb":["rgb"],"image/x-tga":["tga"],"image/x-xbitmap":["xbm"],"image/x-xpixmap":["xpm"],"image/x-xwindowdump":["xwd"],"message/vnd.wfa.wsc":["wsc"],"model/vnd.collada+xml":["dae"],"model/vnd.dwf":["dwf"],"model/vnd.gdl":["gdl"],"model/vnd.gtw":["gtw"],"model/vnd.mts":["mts"],"model/vnd.opengex":["ogex"],"model/vnd.parasolid.transmit.binary":["x_b"],"model/vnd.parasolid.transmit.text":["x_t"],"model/vnd.usdz+zip":["usdz"],"model/vnd.valve.source.compiled-map":["bsp"],"model/vnd.vtu":["vtu"],"text/prs.lines.tag":["dsc"],"text/vnd.curl":["curl"],"text/vnd.curl.dcurl":["dcurl"],"text/vnd.curl.mcurl":["mcurl"],"text/vnd.curl.scurl":["scurl"],"text/vnd.dvb.subtitle":["sub"],"text/vnd.fly":["fly"],"text/vnd.fmi.flexstor":["flx"],"text/vnd.graphviz":["gv"],"text/vnd.in3d.3dml":["3dml"],"text/vnd.in3d.spot":["spot"],"text/vnd.sun.j2me.app-descriptor":["jad"],"text/vnd.wap.wml":["wml"],"text/vnd.wap.wmlscript":["wmls"],"text/x-asm":["s","asm"],"text/x-c":["c","cc","cxx","cpp","h","hh","dic"],"text/x-component":["htc"],"text/x-fortran":["f","for","f77","f90"],"text/x-handlebars-template":["hbs"],"text/x-java-source":["java"],"text/x-lua":["lua"],"text/x-markdown":["mkd"],"text/x-nfo":["nfo"],"text/x-opml":["opml"],"text/x-org":["*org"],"text/x-pascal":["p","pas"],"text/x-processing":["pde"],"text/x-sass":["sass"],"text/x-scss":["scss"],"text/x-setext":["etx"],"text/x-sfv":["sfv"],"text/x-suse-ymp":["ymp"],"text/x-uuencode":["uu"],"text/x-vcalendar":["vcs"],"text/x-vcard":["vcf"],"video/vnd.dece.hd":["uvh","uvvh"],"video/vnd.dece.mobile":["uvm","uvvm"],"video/vnd.dece.pd":["uvp","uvvp"],"video/vnd.dece.sd":["uvs","uvvs"],"video/vnd.dece.video":["uvv","uvvv"],"video/vnd.dvb.file":["dvb"],"video/vnd.fvt":["fvt"],"video/vnd.mpegurl":["mxu","m4u"],"video/vnd.ms-playready.media.pyv":["pyv"],"video/vnd.uvvu.mp4":["uvu","uvvu"],"video/vnd.vivo":["viv"],"video/x-f4v":["f4v"],"video/x-fli":["fli"],"video/x-flv":["flv"],"video/x-m4v":["m4v"],"video/x-matroska":["mkv","mk3d","mks"],"video/x-mng":["mng"],"video/x-ms-asf":["asf","asx"],"video/x-ms-vob":["vob"],"video/x-ms-wm":["wm"],"video/x-ms-wmv":["wmv"],"video/x-ms-wmx":["wmx"],"video/x-ms-wvx":["wvx"],"video/x-msvideo":["avi"],"video/x-sgi-movie":["movie"],"video/x-smv":["smv"],"x-conference/x-cooltalk":["ice"]};

/***/ }),

/***/ "./node_modules/mime/types/standard.js":
/*!*********************************************!*\
  !*** ./node_modules/mime/types/standard.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {"application/andrew-inset":["ez"],"application/applixware":["aw"],"application/atom+xml":["atom"],"application/atomcat+xml":["atomcat"],"application/atomdeleted+xml":["atomdeleted"],"application/atomsvc+xml":["atomsvc"],"application/atsc-dwd+xml":["dwd"],"application/atsc-held+xml":["held"],"application/atsc-rsat+xml":["rsat"],"application/bdoc":["bdoc"],"application/calendar+xml":["xcs"],"application/ccxml+xml":["ccxml"],"application/cdfx+xml":["cdfx"],"application/cdmi-capability":["cdmia"],"application/cdmi-container":["cdmic"],"application/cdmi-domain":["cdmid"],"application/cdmi-object":["cdmio"],"application/cdmi-queue":["cdmiq"],"application/cu-seeme":["cu"],"application/dash+xml":["mpd"],"application/davmount+xml":["davmount"],"application/docbook+xml":["dbk"],"application/dssc+der":["dssc"],"application/dssc+xml":["xdssc"],"application/ecmascript":["ecma","es"],"application/emma+xml":["emma"],"application/emotionml+xml":["emotionml"],"application/epub+zip":["epub"],"application/exi":["exi"],"application/fdt+xml":["fdt"],"application/font-tdpfr":["pfr"],"application/geo+json":["geojson"],"application/gml+xml":["gml"],"application/gpx+xml":["gpx"],"application/gxf":["gxf"],"application/gzip":["gz"],"application/hjson":["hjson"],"application/hyperstudio":["stk"],"application/inkml+xml":["ink","inkml"],"application/ipfix":["ipfix"],"application/its+xml":["its"],"application/java-archive":["jar","war","ear"],"application/java-serialized-object":["ser"],"application/java-vm":["class"],"application/javascript":["js","mjs"],"application/json":["json","map"],"application/json5":["json5"],"application/jsonml+json":["jsonml"],"application/ld+json":["jsonld"],"application/lgr+xml":["lgr"],"application/lost+xml":["lostxml"],"application/mac-binhex40":["hqx"],"application/mac-compactpro":["cpt"],"application/mads+xml":["mads"],"application/manifest+json":["webmanifest"],"application/marc":["mrc"],"application/marcxml+xml":["mrcx"],"application/mathematica":["ma","nb","mb"],"application/mathml+xml":["mathml"],"application/mbox":["mbox"],"application/mediaservercontrol+xml":["mscml"],"application/metalink+xml":["metalink"],"application/metalink4+xml":["meta4"],"application/mets+xml":["mets"],"application/mmt-aei+xml":["maei"],"application/mmt-usd+xml":["musd"],"application/mods+xml":["mods"],"application/mp21":["m21","mp21"],"application/mp4":["mp4s","m4p"],"application/mrb-consumer+xml":["*xdf"],"application/mrb-publish+xml":["*xdf"],"application/msword":["doc","dot"],"application/mxf":["mxf"],"application/n-quads":["nq"],"application/n-triples":["nt"],"application/node":["cjs"],"application/octet-stream":["bin","dms","lrf","mar","so","dist","distz","pkg","bpk","dump","elc","deploy","exe","dll","deb","dmg","iso","img","msi","msp","msm","buffer"],"application/oda":["oda"],"application/oebps-package+xml":["opf"],"application/ogg":["ogx"],"application/omdoc+xml":["omdoc"],"application/onenote":["onetoc","onetoc2","onetmp","onepkg"],"application/oxps":["oxps"],"application/p2p-overlay+xml":["relo"],"application/patch-ops-error+xml":["*xer"],"application/pdf":["pdf"],"application/pgp-encrypted":["pgp"],"application/pgp-signature":["asc","sig"],"application/pics-rules":["prf"],"application/pkcs10":["p10"],"application/pkcs7-mime":["p7m","p7c"],"application/pkcs7-signature":["p7s"],"application/pkcs8":["p8"],"application/pkix-attr-cert":["ac"],"application/pkix-cert":["cer"],"application/pkix-crl":["crl"],"application/pkix-pkipath":["pkipath"],"application/pkixcmp":["pki"],"application/pls+xml":["pls"],"application/postscript":["ai","eps","ps"],"application/provenance+xml":["provx"],"application/pskc+xml":["pskcxml"],"application/raml+yaml":["raml"],"application/rdf+xml":["rdf","owl"],"application/reginfo+xml":["rif"],"application/relax-ng-compact-syntax":["rnc"],"application/resource-lists+xml":["rl"],"application/resource-lists-diff+xml":["rld"],"application/rls-services+xml":["rs"],"application/route-apd+xml":["rapd"],"application/route-s-tsid+xml":["sls"],"application/route-usd+xml":["rusd"],"application/rpki-ghostbusters":["gbr"],"application/rpki-manifest":["mft"],"application/rpki-roa":["roa"],"application/rsd+xml":["rsd"],"application/rss+xml":["rss"],"application/rtf":["rtf"],"application/sbml+xml":["sbml"],"application/scvp-cv-request":["scq"],"application/scvp-cv-response":["scs"],"application/scvp-vp-request":["spq"],"application/scvp-vp-response":["spp"],"application/sdp":["sdp"],"application/senml+xml":["senmlx"],"application/sensml+xml":["sensmlx"],"application/set-payment-initiation":["setpay"],"application/set-registration-initiation":["setreg"],"application/shf+xml":["shf"],"application/sieve":["siv","sieve"],"application/smil+xml":["smi","smil"],"application/sparql-query":["rq"],"application/sparql-results+xml":["srx"],"application/srgs":["gram"],"application/srgs+xml":["grxml"],"application/sru+xml":["sru"],"application/ssdl+xml":["ssdl"],"application/ssml+xml":["ssml"],"application/swid+xml":["swidtag"],"application/tei+xml":["tei","teicorpus"],"application/thraud+xml":["tfi"],"application/timestamped-data":["tsd"],"application/toml":["toml"],"application/ttml+xml":["ttml"],"application/urc-ressheet+xml":["rsheet"],"application/voicexml+xml":["vxml"],"application/wasm":["wasm"],"application/widget":["wgt"],"application/winhlp":["hlp"],"application/wsdl+xml":["wsdl"],"application/wspolicy+xml":["wspolicy"],"application/xaml+xml":["xaml"],"application/xcap-att+xml":["xav"],"application/xcap-caps+xml":["xca"],"application/xcap-diff+xml":["xdf"],"application/xcap-el+xml":["xel"],"application/xcap-error+xml":["xer"],"application/xcap-ns+xml":["xns"],"application/xenc+xml":["xenc"],"application/xhtml+xml":["xhtml","xht"],"application/xliff+xml":["xlf"],"application/xml":["xml","xsl","xsd","rng"],"application/xml-dtd":["dtd"],"application/xop+xml":["xop"],"application/xproc+xml":["xpl"],"application/xslt+xml":["xslt"],"application/xspf+xml":["xspf"],"application/xv+xml":["mxml","xhvml","xvml","xvm"],"application/yang":["yang"],"application/yin+xml":["yin"],"application/zip":["zip"],"audio/3gpp":["*3gpp"],"audio/adpcm":["adp"],"audio/basic":["au","snd"],"audio/midi":["mid","midi","kar","rmi"],"audio/mobile-xmf":["mxmf"],"audio/mp3":["*mp3"],"audio/mp4":["m4a","mp4a"],"audio/mpeg":["mpga","mp2","mp2a","mp3","m2a","m3a"],"audio/ogg":["oga","ogg","spx"],"audio/s3m":["s3m"],"audio/silk":["sil"],"audio/wav":["wav"],"audio/wave":["*wav"],"audio/webm":["weba"],"audio/xm":["xm"],"font/collection":["ttc"],"font/otf":["otf"],"font/ttf":["ttf"],"font/woff":["woff"],"font/woff2":["woff2"],"image/aces":["exr"],"image/apng":["apng"],"image/bmp":["bmp"],"image/cgm":["cgm"],"image/dicom-rle":["drle"],"image/emf":["emf"],"image/fits":["fits"],"image/g3fax":["g3"],"image/gif":["gif"],"image/heic":["heic"],"image/heic-sequence":["heics"],"image/heif":["heif"],"image/heif-sequence":["heifs"],"image/hej2k":["hej2"],"image/hsj2":["hsj2"],"image/ief":["ief"],"image/jls":["jls"],"image/jp2":["jp2","jpg2"],"image/jpeg":["jpeg","jpg","jpe"],"image/jph":["jph"],"image/jphc":["jhc"],"image/jpm":["jpm"],"image/jpx":["jpx","jpf"],"image/jxr":["jxr"],"image/jxra":["jxra"],"image/jxrs":["jxrs"],"image/jxs":["jxs"],"image/jxsc":["jxsc"],"image/jxsi":["jxsi"],"image/jxss":["jxss"],"image/ktx":["ktx"],"image/png":["png"],"image/sgi":["sgi"],"image/svg+xml":["svg","svgz"],"image/t38":["t38"],"image/tiff":["tif","tiff"],"image/tiff-fx":["tfx"],"image/webp":["webp"],"image/wmf":["wmf"],"message/disposition-notification":["disposition-notification"],"message/global":["u8msg"],"message/global-delivery-status":["u8dsn"],"message/global-disposition-notification":["u8mdn"],"message/global-headers":["u8hdr"],"message/rfc822":["eml","mime"],"model/3mf":["3mf"],"model/gltf+json":["gltf"],"model/gltf-binary":["glb"],"model/iges":["igs","iges"],"model/mesh":["msh","mesh","silo"],"model/mtl":["mtl"],"model/obj":["obj"],"model/stl":["stl"],"model/vrml":["wrl","vrml"],"model/x3d+binary":["*x3db","x3dbz"],"model/x3d+fastinfoset":["x3db"],"model/x3d+vrml":["*x3dv","x3dvz"],"model/x3d+xml":["x3d","x3dz"],"model/x3d-vrml":["x3dv"],"text/cache-manifest":["appcache","manifest"],"text/calendar":["ics","ifb"],"text/coffeescript":["coffee","litcoffee"],"text/css":["css"],"text/csv":["csv"],"text/html":["html","htm","shtml"],"text/jade":["jade"],"text/jsx":["jsx"],"text/less":["less"],"text/markdown":["markdown","md"],"text/mathml":["mml"],"text/mdx":["mdx"],"text/n3":["n3"],"text/plain":["txt","text","conf","def","list","log","in","ini"],"text/richtext":["rtx"],"text/rtf":["*rtf"],"text/sgml":["sgml","sgm"],"text/shex":["shex"],"text/slim":["slim","slm"],"text/stylus":["stylus","styl"],"text/tab-separated-values":["tsv"],"text/troff":["t","tr","roff","man","me","ms"],"text/turtle":["ttl"],"text/uri-list":["uri","uris","urls"],"text/vcard":["vcard"],"text/vtt":["vtt"],"text/xml":["*xml"],"text/yaml":["yaml","yml"],"video/3gpp":["3gp","3gpp"],"video/3gpp2":["3g2"],"video/h261":["h261"],"video/h263":["h263"],"video/h264":["h264"],"video/jpeg":["jpgv"],"video/jpm":["*jpm","jpgm"],"video/mj2":["mj2","mjp2"],"video/mp2t":["ts"],"video/mp4":["mp4","mp4v","mpg4"],"video/mpeg":["mpeg","mpg","mpe","m1v","m2v"],"video/ogg":["ogv"],"video/quicktime":["qt","mov"],"video/webm":["webm"]};

/***/ }),

/***/ "./node_modules/ngx-quill/fesm2015/ngx-quill.js":
/*!******************************************************!*\
  !*** ./node_modules/ngx-quill/fesm2015/ngx-quill.js ***!
  \******************************************************/
/*! exports provided: QUILL_CONFIG_TOKEN, QuillEditorBase, QuillEditorComponent, QuillModule, QuillService, QuillViewComponent, QuillViewHTMLComponent, defaultModules */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QUILL_CONFIG_TOKEN", function() { return QUILL_CONFIG_TOKEN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QuillEditorBase", function() { return QuillEditorBase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QuillEditorComponent", function() { return QuillEditorComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QuillModule", function() { return QuillModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QuillService", function() { return QuillService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QuillViewComponent", function() { return QuillViewComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QuillViewHTMLComponent", function() { return QuillViewHTMLComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultModules", function() { return defaultModules; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");










const _c0 = [[["", "quill-editor-toolbar", ""]]];
const _c1 = ["[quill-editor-toolbar]"];
const defaultModules = {
    toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{ header: 1 }, { header: 2 }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ script: 'sub' }, { script: 'super' }],
        [{ indent: '-1' }, { indent: '+1' }],
        [{ direction: 'rtl' }],
        [{ size: ['small', false, 'large', 'huge'] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [
            { color: [] },
            { background: [] }
        ],
        [{ font: [] }],
        [{ align: [] }],
        ['clean'],
        ['link', 'image', 'video'] // link and image, video
    ]
};

const getFormat = (format, configFormat) => {
    const passedFormat = format || configFormat;
    return passedFormat || 'html';
};

const QUILL_CONFIG_TOKEN = new _angular_core__WEBPACK_IMPORTED_MODULE_2__["InjectionToken"]('config');

let QuillService = class QuillService {
    constructor(config) {
        this.config = config;
        this.count = 0;
        if (!this.config) {
            this.config = { modules: defaultModules };
        }
    }
    getQuill() {
        this.count++;
        if (!this.Quill && this.count === 1) {
            this.$importPromise = new Promise((resolve) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                var _a, _b;
                const quillImport = yield __webpack_require__.e(/*! import() | quill */ "quill").then(__webpack_require__.t.bind(null, /*! quill */ "./node_modules/quill/dist/quill.js", 7));
                this.Quill = (quillImport.default ? quillImport.default : quillImport);
                // Only register custom options and modules once
                (_a = this.config.customOptions) === null || _a === void 0 ? void 0 : _a.forEach((customOption) => {
                    const newCustomOption = this.Quill.import(customOption.import);
                    newCustomOption.whitelist = customOption.whitelist;
                    this.Quill.register(newCustomOption, true, this.config.suppressGlobalRegisterWarning);
                });
                (_b = this.config.customModules) === null || _b === void 0 ? void 0 : _b.forEach(({ implementation, path }) => {
                    this.Quill.register(path, implementation, this.config.suppressGlobalRegisterWarning);
                });
                resolve(this.Quill);
            }));
        }
        return this.$importPromise;
    }
};
QuillService.ɵfac = function QuillService_Factory(t) { return new (t || QuillService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](QUILL_CONFIG_TOKEN)); };
QuillService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"], args: [QUILL_CONFIG_TOKEN,] }] }
];
QuillService.ɵprov = Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"])({ factory: function QuillService_Factory() { return new QuillService(Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"])(QUILL_CONFIG_TOKEN)); }, token: QuillService, providedIn: "root" });
QuillService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([ Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"])(QUILL_CONFIG_TOKEN))
], QuillService);

var QuillEditorBase_1, QuillEditorComponent_1;
let QuillEditorBase = QuillEditorBase_1 = 
// tslint:disable-next-line:directive-class-suffix
class QuillEditorBase {
    constructor(elementRef, domSanitizer, doc, platformId, renderer, zone, service) {
        this.elementRef = elementRef;
        this.domSanitizer = domSanitizer;
        this.doc = doc;
        this.platformId = platformId;
        this.renderer = renderer;
        this.zone = zone;
        this.service = service;
        this.required = false;
        this.customToolbarPosition = 'top';
        this.sanitize = false;
        this.styles = null;
        this.strict = true;
        this.customOptions = [];
        this.customModules = [];
        this.preserveWhitespace = false;
        this.trimOnValidation = false;
        this.onEditorCreated = new _angular_core__WEBPACK_IMPORTED_MODULE_2__["EventEmitter"]();
        this.onEditorChanged = new _angular_core__WEBPACK_IMPORTED_MODULE_2__["EventEmitter"]();
        this.onContentChanged = new _angular_core__WEBPACK_IMPORTED_MODULE_2__["EventEmitter"]();
        this.onSelectionChanged = new _angular_core__WEBPACK_IMPORTED_MODULE_2__["EventEmitter"]();
        this.onFocus = new _angular_core__WEBPACK_IMPORTED_MODULE_2__["EventEmitter"]();
        this.onBlur = new _angular_core__WEBPACK_IMPORTED_MODULE_2__["EventEmitter"]();
        this.disabled = false; // used to store initial value before ViewInit
        this.valueGetter = (quillEditor, editorElement) => {
            let html = editorElement.querySelector('.ql-editor').innerHTML;
            if (html === '<p><br></p>' || html === '<div><br></div>') {
                html = null;
            }
            let modelValue = html;
            const format = getFormat(this.format, this.service.config.format);
            if (format === 'text') {
                modelValue = quillEditor.getText();
            }
            else if (format === 'object') {
                modelValue = quillEditor.getContents();
            }
            else if (format === 'json') {
                try {
                    modelValue = JSON.stringify(quillEditor.getContents());
                }
                catch (e) {
                    modelValue = quillEditor.getText();
                }
            }
            return modelValue;
        };
        this.valueSetter = (quillEditor, value) => {
            const format = getFormat(this.format, this.service.config.format);
            if (format === 'html') {
                if (this.sanitize) {
                    value = this.domSanitizer.sanitize(_angular_core__WEBPACK_IMPORTED_MODULE_2__["SecurityContext"].HTML, value);
                }
                return quillEditor.clipboard.convert(value);
            }
            else if (format === 'json') {
                try {
                    return JSON.parse(value);
                }
                catch (e) {
                    return [{ insert: value }];
                }
            }
            return value;
        };
        this.selectionChangeHandler = (range, oldRange, source) => {
            const shouldTriggerOnModelTouched = !range && !!this.onModelTouched;
            // only emit changes when there's any listener
            if (!this.onBlur.observers.length &&
                !this.onFocus.observers.length &&
                !this.onSelectionChanged.observers.length &&
                !shouldTriggerOnModelTouched) {
                return;
            }
            this.zone.run(() => {
                if (range === null) {
                    this.onBlur.emit({
                        editor: this.quillEditor,
                        source
                    });
                }
                else if (oldRange === null) {
                    this.onFocus.emit({
                        editor: this.quillEditor,
                        source
                    });
                }
                this.onSelectionChanged.emit({
                    editor: this.quillEditor,
                    oldRange,
                    range,
                    source
                });
                if (shouldTriggerOnModelTouched) {
                    this.onModelTouched();
                }
            });
        };
        this.textChangeHandler = (delta, oldDelta, source) => {
            // only emit changes emitted by user interactions
            const text = this.quillEditor.getText();
            const content = this.quillEditor.getContents();
            let html = this.editorElem.querySelector('.ql-editor').innerHTML;
            if (html === '<p><br></p>' || html === '<div><br></div>') {
                html = null;
            }
            const trackChanges = this.trackChanges || this.service.config.trackChanges;
            const shouldTriggerOnModelChange = (source === 'user' || trackChanges && trackChanges === 'all') && !!this.onModelChange;
            // only emit changes when there's any listener
            if (!this.onContentChanged.observers.length && !shouldTriggerOnModelChange) {
                return;
            }
            this.zone.run(() => {
                if (shouldTriggerOnModelChange) {
                    this.onModelChange(this.valueGetter(this.quillEditor, this.editorElem));
                }
                this.onContentChanged.emit({
                    content,
                    delta,
                    editor: this.quillEditor,
                    html,
                    oldDelta,
                    source,
                    text
                });
            });
        };
        // tslint:disable-next-line:max-line-length
        this.editorChangeHandler = (event, current, old, source) => {
            // only emit changes when there's any listener
            if (!this.onEditorChanged.observers.length) {
                return;
            }
            // only emit changes emitted by user interactions
            if (event === 'text-change') {
                const text = this.quillEditor.getText();
                const content = this.quillEditor.getContents();
                let html = this.editorElem.querySelector('.ql-editor').innerHTML;
                if (html === '<p><br></p>' || html === '<div><br></div>') {
                    html = null;
                }
                this.zone.run(() => {
                    this.onEditorChanged.emit({
                        content,
                        delta: current,
                        editor: this.quillEditor,
                        event,
                        html,
                        oldDelta: old,
                        source,
                        text
                    });
                });
            }
            else {
                this.onEditorChanged.emit({
                    editor: this.quillEditor,
                    event,
                    oldRange: old,
                    range: current,
                    source
                });
            }
        };
    }
    static normalizeClassNames(classes) {
        const classList = classes.trim().split(' ');
        return classList.reduce((prev, cur) => {
            const trimmed = cur.trim();
            if (trimmed) {
                prev.push(trimmed);
            }
            return prev;
        }, []);
    }
    ngAfterViewInit() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (Object(_angular_common__WEBPACK_IMPORTED_MODULE_1__["isPlatformServer"])(this.platformId)) {
                return;
            }
            const Quill = yield this.service.getQuill();
            this.elementRef.nativeElement.insertAdjacentHTML(this.customToolbarPosition === 'top' ? 'beforeend' : 'afterbegin', this.preserveWhitespace ? '<pre quill-editor-element></pre>' : '<div quill-editor-element></div>');
            this.editorElem = this.elementRef.nativeElement.querySelector('[quill-editor-element]');
            const toolbarElem = this.elementRef.nativeElement.querySelector('[quill-editor-toolbar]');
            const modules = Object.assign({}, this.modules || this.service.config.modules);
            if (toolbarElem) {
                modules.toolbar = toolbarElem;
            }
            else if (modules.toolbar === undefined) {
                modules.toolbar = defaultModules.toolbar;
            }
            let placeholder = this.placeholder !== undefined ? this.placeholder : this.service.config.placeholder;
            if (placeholder === undefined) {
                placeholder = 'Insert text here ...';
            }
            if (this.styles) {
                Object.keys(this.styles).forEach((key) => {
                    this.renderer.setStyle(this.editorElem, key, this.styles[key]);
                });
            }
            if (this.classes) {
                this.addClasses(this.classes);
            }
            this.customOptions.forEach((customOption) => {
                const newCustomOption = Quill.import(customOption.import);
                newCustomOption.whitelist = customOption.whitelist;
                Quill.register(newCustomOption, true);
            });
            this.customModules.forEach(({ implementation, path }) => {
                Quill.register(path, implementation);
            });
            let bounds = this.bounds && this.bounds === 'self' ? this.editorElem : this.bounds;
            if (!bounds) {
                bounds = this.service.config.bounds ? this.service.config.bounds : this.doc.body;
            }
            let debug = this.debug;
            if (!debug && debug !== false && this.service.config.debug) {
                debug = this.service.config.debug;
            }
            let readOnly = this.readOnly;
            if (!readOnly && this.readOnly !== false) {
                readOnly = this.service.config.readOnly !== undefined ? this.service.config.readOnly : false;
            }
            let scrollingContainer = this.scrollingContainer;
            if (!scrollingContainer && this.scrollingContainer !== null) {
                scrollingContainer =
                    this.service.config.scrollingContainer === null
                        || this.service.config.scrollingContainer ? this.service.config.scrollingContainer : null;
            }
            let formats = this.formats;
            if (!formats && formats === undefined) {
                formats = this.service.config.formats ? [...this.service.config.formats] : (this.service.config.formats === null ? null : undefined);
            }
            this.zone.runOutsideAngular(() => {
                this.quillEditor = new Quill(this.editorElem, {
                    bounds,
                    debug: debug,
                    formats: formats,
                    modules,
                    placeholder,
                    readOnly,
                    scrollingContainer: scrollingContainer,
                    strict: this.strict,
                    theme: this.theme || (this.service.config.theme ? this.service.config.theme : 'snow')
                });
            });
            if (this.content) {
                const format = getFormat(this.format, this.service.config.format);
                if (format === 'object') {
                    this.quillEditor.setContents(this.content, 'silent');
                }
                else if (format === 'text') {
                    this.quillEditor.setText(this.content, 'silent');
                }
                else if (format === 'json') {
                    try {
                        this.quillEditor.setContents(JSON.parse(this.content), 'silent');
                    }
                    catch (e) {
                        this.quillEditor.setText(this.content, 'silent');
                    }
                }
                else {
                    if (this.sanitize) {
                        this.content = this.domSanitizer.sanitize(_angular_core__WEBPACK_IMPORTED_MODULE_2__["SecurityContext"].HTML, this.content);
                    }
                    const contents = this.quillEditor.clipboard.convert(this.content);
                    this.quillEditor.setContents(contents, 'silent');
                }
                this.quillEditor.getModule('history').clear();
            }
            // initialize disabled status based on this.disabled as default value
            this.setDisabledState();
            // triggered if selection or text changed
            this.quillEditor.on('editor-change', this.editorChangeHandler);
            // mark model as touched if editor lost focus
            this.quillEditor.on('selection-change', this.selectionChangeHandler);
            // update model if text changes
            this.quillEditor.on('text-change', this.textChangeHandler);
            // trigger created in a timeout to avoid changed models after checked
            // if you are using the editor api in created output to change the editor content
            setTimeout(() => {
                if (this.onValidatorChanged) {
                    this.onValidatorChanged();
                }
                this.onEditorCreated.emit(this.quillEditor);
            });
        });
    }
    ngOnDestroy() {
        if (this.quillEditor) {
            this.quillEditor.off('selection-change', this.selectionChangeHandler);
            this.quillEditor.off('text-change', this.textChangeHandler);
            this.quillEditor.off('editor-change', this.editorChangeHandler);
        }
    }
    ngOnChanges(changes) {
        if (!this.quillEditor) {
            return;
        }
        // tslint:disable:no-string-literal
        if (changes['readOnly']) {
            this.quillEditor.enable(!changes['readOnly'].currentValue);
        }
        if (changes['placeholder']) {
            this.quillEditor.root.dataset.placeholder =
                changes['placeholder'].currentValue;
        }
        if (changes['styles']) {
            const currentStyling = changes['styles'].currentValue;
            const previousStyling = changes['styles'].previousValue;
            if (previousStyling) {
                Object.keys(previousStyling).forEach((key) => {
                    this.renderer.removeStyle(this.editorElem, key);
                });
            }
            if (currentStyling) {
                Object.keys(currentStyling).forEach((key) => {
                    this.renderer.setStyle(this.editorElem, key, this.styles[key]);
                });
            }
        }
        if (changes['classes']) {
            const currentClasses = changes['classes'].currentValue;
            const previousClasses = changes['classes'].previousValue;
            if (previousClasses) {
                this.removeClasses(previousClasses);
            }
            if (currentClasses) {
                this.addClasses(currentClasses);
            }
        }
        // tslint:enable:no-string-literal
    }
    addClasses(classList) {
        QuillEditorBase_1.normalizeClassNames(classList).forEach((c) => {
            this.renderer.addClass(this.editorElem, c);
        });
    }
    removeClasses(classList) {
        QuillEditorBase_1.normalizeClassNames(classList).forEach((c) => {
            this.renderer.removeClass(this.editorElem, c);
        });
    }
    writeValue(currentValue) {
        this.content = currentValue;
        const format = getFormat(this.format, this.service.config.format);
        if (this.quillEditor) {
            if (currentValue) {
                if (format === 'text') {
                    this.quillEditor.setText(currentValue);
                }
                else {
                    this.quillEditor.setContents(this.valueSetter(this.quillEditor, this.content));
                }
                return;
            }
            this.quillEditor.setText('');
        }
    }
    setDisabledState(isDisabled = this.disabled) {
        // store initial value to set appropriate disabled status after ViewInit
        this.disabled = isDisabled;
        if (this.quillEditor) {
            if (isDisabled) {
                this.quillEditor.disable();
                this.renderer.setAttribute(this.elementRef.nativeElement, 'disabled', 'disabled');
            }
            else {
                if (!this.readOnly) {
                    this.quillEditor.enable();
                }
                this.renderer.removeAttribute(this.elementRef.nativeElement, 'disabled');
            }
        }
    }
    registerOnChange(fn) {
        this.onModelChange = fn;
    }
    registerOnTouched(fn) {
        this.onModelTouched = fn;
    }
    registerOnValidatorChange(fn) {
        this.onValidatorChanged = fn;
    }
    validate() {
        if (!this.quillEditor) {
            return null;
        }
        const err = {};
        let valid = true;
        const text = this.quillEditor.getText();
        // trim text if wanted + handle special case that an empty editor contains a new line
        const textLength = this.trimOnValidation ? text.trim().length : (text.length === 1 && text.trim().length === 0 ? 0 : text.length - 1);
        if (this.minLength && textLength && textLength < this.minLength) {
            err.minLengthError = {
                given: textLength,
                minLength: this.minLength
            };
            valid = false;
        }
        if (this.maxLength && textLength > this.maxLength) {
            err.maxLengthError = {
                given: textLength,
                maxLength: this.maxLength
            };
            valid = false;
        }
        if (this.required && !textLength) {
            err.requiredError = {
                empty: true
            };
            valid = false;
        }
        return valid ? null : err;
    }
};
QuillEditorBase.ɵfac = function QuillEditorBase_Factory(t) { return new (t || QuillEditorBase)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ElementRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["DomSanitizer"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_1__["DOCUMENT"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["PLATFORM_ID"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["Renderer2"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgZone"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](QuillService)); };
QuillEditorBase.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineDirective"]({ type: QuillEditorBase, inputs: { required: "required", customToolbarPosition: "customToolbarPosition", sanitize: "sanitize", styles: "styles", strict: "strict", customOptions: "customOptions", customModules: "customModules", preserveWhitespace: "preserveWhitespace", trimOnValidation: "trimOnValidation", valueGetter: "valueGetter", valueSetter: "valueSetter", format: "format", theme: "theme", modules: "modules", debug: "debug", readOnly: "readOnly", placeholder: "placeholder", maxLength: "maxLength", minLength: "minLength", formats: "formats", scrollingContainer: "scrollingContainer", bounds: "bounds", trackChanges: "trackChanges", classes: "classes" }, outputs: { onEditorCreated: "onEditorCreated", onEditorChanged: "onEditorChanged", onContentChanged: "onContentChanged", onSelectionChanged: "onSelectionChanged", onFocus: "onFocus", onBlur: "onBlur" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵNgOnChangesFeature"]] });
QuillEditorBase.ctorParameters = () => [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["ElementRef"] },
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["DomSanitizer"] },
    { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"], args: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["DOCUMENT"],] }] },
    { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"], args: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["PLATFORM_ID"],] }] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Renderer2"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["NgZone"] },
    { type: QuillService }
];
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])()
], QuillEditorBase.prototype, "format", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])()
], QuillEditorBase.prototype, "theme", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])()
], QuillEditorBase.prototype, "modules", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])()
], QuillEditorBase.prototype, "debug", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])()
], QuillEditorBase.prototype, "readOnly", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])()
], QuillEditorBase.prototype, "placeholder", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])()
], QuillEditorBase.prototype, "maxLength", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])()
], QuillEditorBase.prototype, "minLength", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])()
], QuillEditorBase.prototype, "required", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])()
], QuillEditorBase.prototype, "formats", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])()
], QuillEditorBase.prototype, "customToolbarPosition", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])()
], QuillEditorBase.prototype, "sanitize", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])()
], QuillEditorBase.prototype, "styles", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])()
], QuillEditorBase.prototype, "strict", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])()
], QuillEditorBase.prototype, "scrollingContainer", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])()
], QuillEditorBase.prototype, "bounds", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])()
], QuillEditorBase.prototype, "customOptions", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])()
], QuillEditorBase.prototype, "customModules", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])()
], QuillEditorBase.prototype, "trackChanges", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])()
], QuillEditorBase.prototype, "preserveWhitespace", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])()
], QuillEditorBase.prototype, "classes", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])()
], QuillEditorBase.prototype, "trimOnValidation", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Output"])()
], QuillEditorBase.prototype, "onEditorCreated", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Output"])()
], QuillEditorBase.prototype, "onEditorChanged", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Output"])()
], QuillEditorBase.prototype, "onContentChanged", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Output"])()
], QuillEditorBase.prototype, "onSelectionChanged", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Output"])()
], QuillEditorBase.prototype, "onFocus", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Output"])()
], QuillEditorBase.prototype, "onBlur", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])()
], QuillEditorBase.prototype, "valueGetter", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])()
], QuillEditorBase.prototype, "valueSetter", void 0);
QuillEditorBase = QuillEditorBase_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([ Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(2, Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"])(_angular_common__WEBPACK_IMPORTED_MODULE_1__["DOCUMENT"])),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(3, Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"])(_angular_core__WEBPACK_IMPORTED_MODULE_2__["PLATFORM_ID"]))
], QuillEditorBase);
let QuillEditorComponent = QuillEditorComponent_1 = class QuillEditorComponent extends QuillEditorBase {
    constructor(elementRef, domSanitizer, doc, platformId, renderer, zone, service) {
        super(elementRef, domSanitizer, doc, platformId, renderer, zone, service);
    }
};
QuillEditorComponent.ɵfac = function QuillEditorComponent_Factory(t) { return new (t || QuillEditorComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ElementRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["DomSanitizer"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_1__["DOCUMENT"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["PLATFORM_ID"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["Renderer2"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgZone"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](QuillService)); };
QuillEditorComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: QuillEditorComponent, selectors: [["quill-editor"]], features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵProvidersFeature"]([
            {
                multi: true,
                provide: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NG_VALUE_ACCESSOR"],
                // eslint-disable-next-line @typescript-eslint/no-use-before-define
                useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["forwardRef"])(() => QuillEditorComponent_1)
            },
            {
                multi: true,
                provide: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NG_VALIDATORS"],
                // eslint-disable-next-line @typescript-eslint/no-use-before-define
                useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["forwardRef"])(() => QuillEditorComponent_1)
            }
        ]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵInheritDefinitionFeature"]], ngContentSelectors: _c1, decls: 1, vars: 0, template: function QuillEditorComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵprojectionDef"](_c0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵprojection"](0);
    } }, encapsulation: 2 });
QuillEditorComponent.ctorParameters = () => [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["ElementRef"], decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"], args: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ElementRef"],] }] },
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["DomSanitizer"], decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"], args: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["DomSanitizer"],] }] },
    { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"], args: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["DOCUMENT"],] }] },
    { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"], args: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["PLATFORM_ID"],] }] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Renderer2"], decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"], args: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["Renderer2"],] }] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["NgZone"], decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"], args: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgZone"],] }] },
    { type: QuillService, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"], args: [QuillService,] }] }
];
QuillEditorComponent = QuillEditorComponent_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([ Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"])(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ElementRef"])),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"])(_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["DomSanitizer"])),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(2, Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"])(_angular_common__WEBPACK_IMPORTED_MODULE_1__["DOCUMENT"])),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(3, Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"])(_angular_core__WEBPACK_IMPORTED_MODULE_2__["PLATFORM_ID"])),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(4, Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"])(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Renderer2"])),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(5, Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"])(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgZone"])),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(6, Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"])(QuillService))
], QuillEditorComponent);

let QuillViewHTMLComponent = class QuillViewHTMLComponent {
    constructor(sanitizer, service) {
        this.sanitizer = sanitizer;
        this.service = service;
        this.innerHTML = '';
        this.themeClass = 'ql-snow';
        this.content = '';
    }
    ngOnChanges(changes) {
        if (changes.theme) {
            const theme = changes.theme.currentValue || (this.service.config.theme ? this.service.config.theme : 'snow');
            this.themeClass = `ql-${theme} ngx-quill-view-html`;
        }
        else if (!this.theme) {
            const theme = this.service.config.theme ? this.service.config.theme : 'snow';
            this.themeClass = `ql-${theme} ngx-quill-view-html`;
        }
        if (changes.content) {
            this.innerHTML = this.sanitizer.bypassSecurityTrustHtml(changes.content.currentValue);
        }
    }
};
QuillViewHTMLComponent.ɵfac = function QuillViewHTMLComponent_Factory(t) { return new (t || QuillViewHTMLComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["DomSanitizer"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](QuillService)); };
QuillViewHTMLComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: QuillViewHTMLComponent, selectors: [["quill-view-html"]], inputs: { content: "content", theme: "theme" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵNgOnChangesFeature"]], decls: 2, vars: 2, consts: [[1, "ql-container", 3, "ngClass"], [1, "ql-editor", 3, "innerHTML"]], template: function QuillViewHTMLComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngClass", ctx.themeClass);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("innerHTML", ctx.innerHTML, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeHtml"]);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["NgClass"]], styles: ["\n.ql-container.ngx-quill-view-html {\n  border: 0;\n}\n"], encapsulation: 2 });
QuillViewHTMLComponent.ctorParameters = () => [
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["DomSanitizer"], decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"], args: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["DomSanitizer"],] }] },
    { type: QuillService }
];
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])()
], QuillViewHTMLComponent.prototype, "content", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])()
], QuillViewHTMLComponent.prototype, "theme", void 0);
QuillViewHTMLComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([ Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"])(_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["DomSanitizer"]))
], QuillViewHTMLComponent);

let QuillViewComponent = class QuillViewComponent {
    constructor(platformId, renderer, elementRef, zone, service) {
        this.platformId = platformId;
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.zone = zone;
        this.service = service;
        this.strict = true;
        this.customModules = [];
        this.customOptions = [];
        this.preserveWhitespace = false;
        this.valueSetter = (quillEditor, value) => {
            const format = getFormat(this.format, this.service.config.format);
            let content = value;
            if (format === 'html' || format === 'text') {
                content = quillEditor.clipboard.convert(value);
            }
            else if (format === 'json') {
                try {
                    content = JSON.parse(value);
                }
                catch (e) {
                    content = [{ insert: value }];
                }
            }
            quillEditor.setContents(content);
        };
    }
    ngOnChanges(changes) {
        if (!this.quillEditor) {
            return;
        }
        if (changes.content) {
            this.valueSetter(this.quillEditor, changes.content.currentValue);
        }
    }
    ngAfterViewInit() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (Object(_angular_common__WEBPACK_IMPORTED_MODULE_1__["isPlatformServer"])(this.platformId)) {
                return;
            }
            const Quill = yield this.service.getQuill();
            const modules = Object.assign({}, this.modules || this.service.config.modules);
            modules.toolbar = false;
            this.customOptions.forEach((customOption) => {
                const newCustomOption = Quill.import(customOption.import);
                newCustomOption.whitelist = customOption.whitelist;
                Quill.register(newCustomOption, true);
            });
            this.customModules.forEach(({ implementation, path }) => {
                Quill.register(path, implementation);
            });
            let debug = this.debug;
            if (!debug && debug !== false && this.service.config.debug) {
                debug = this.service.config.debug;
            }
            let formats = this.formats;
            if (!formats && formats === undefined) {
                formats = this.service.config.formats ?
                    Object.assign({}, this.service.config.formats) : (this.service.config.formats === null ? null : undefined);
            }
            const theme = this.theme || (this.service.config.theme ? this.service.config.theme : 'snow');
            this.elementRef.nativeElement.insertAdjacentHTML('afterbegin', this.preserveWhitespace ? '<pre quill-view-element></pre>' : '<div quill-view-element></div>');
            this.editorElem = this.elementRef.nativeElement.querySelector('[quill-view-element]');
            this.zone.runOutsideAngular(() => {
                this.quillEditor = new Quill(this.editorElem, {
                    debug: debug,
                    formats: formats,
                    modules,
                    readOnly: true,
                    strict: this.strict,
                    theme
                });
            });
            this.renderer.addClass(this.editorElem, 'ngx-quill-view');
            if (this.content) {
                this.valueSetter(this.quillEditor, this.content);
            }
        });
    }
};
QuillViewComponent.ɵfac = function QuillViewComponent_Factory(t) { return new (t || QuillViewComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["PLATFORM_ID"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["Renderer2"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ElementRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgZone"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](QuillService)); };
QuillViewComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: QuillViewComponent, selectors: [["quill-view"]], inputs: { strict: "strict", customModules: "customModules", customOptions: "customOptions", preserveWhitespace: "preserveWhitespace", format: "format", theme: "theme", modules: "modules", debug: "debug", formats: "formats", content: "content" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵNgOnChangesFeature"]], decls: 0, vars: 0, template: function QuillViewComponent_Template(rf, ctx) { }, styles: ["\n.ql-container.ngx-quill-view {\n  border: 0;\n}\n"], encapsulation: 2 });
QuillViewComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"], args: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["PLATFORM_ID"],] }] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Renderer2"], decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"], args: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["Renderer2"],] }] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["ElementRef"], decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"], args: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ElementRef"],] }] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["NgZone"], decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"], args: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgZone"],] }] },
    { type: QuillService, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"], args: [QuillService,] }] }
];
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])()
], QuillViewComponent.prototype, "format", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])()
], QuillViewComponent.prototype, "theme", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])()
], QuillViewComponent.prototype, "modules", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])()
], QuillViewComponent.prototype, "debug", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])()
], QuillViewComponent.prototype, "formats", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])()
], QuillViewComponent.prototype, "strict", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])()
], QuillViewComponent.prototype, "content", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])()
], QuillViewComponent.prototype, "customModules", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])()
], QuillViewComponent.prototype, "customOptions", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])()
], QuillViewComponent.prototype, "preserveWhitespace", void 0);
QuillViewComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([ Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"])(_angular_core__WEBPACK_IMPORTED_MODULE_2__["PLATFORM_ID"])),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"])(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Renderer2"])),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(2, Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"])(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ElementRef"])),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(3, Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"])(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgZone"])),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(4, Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"])(QuillService))
], QuillViewComponent);

var QuillModule_1;
let QuillModule = QuillModule_1 = class QuillModule {
    static forRoot(config) {
        return {
            ngModule: QuillModule_1,
            providers: [
                {
                    provide: QUILL_CONFIG_TOKEN,
                    useValue: config
                }
            ]
        };
    }
};
QuillModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: QuillModule });
QuillModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ factory: function QuillModule_Factory(t) { return new (t || QuillModule)(); }, providers: [QuillService], imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"]]] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵsetClassMetadata"](QuillService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"],
                args: [QUILL_CONFIG_TOKEN]
            }] }]; }, null); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵsetClassMetadata"](QuillEditorBase, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Directive"]
    }], function () { return [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["ElementRef"] }, { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["DomSanitizer"] }, { type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"],
                args: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["DOCUMENT"]]
            }] }, { type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"],
                args: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["PLATFORM_ID"]]
            }] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Renderer2"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["NgZone"] }, { type: QuillService }]; }, { required: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"]
        }], customToolbarPosition: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"]
        }], sanitize: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"]
        }], styles: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"]
        }], strict: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"]
        }], customOptions: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"]
        }], customModules: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"]
        }], preserveWhitespace: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"]
        }], trimOnValidation: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"]
        }], onEditorCreated: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Output"]
        }], onEditorChanged: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Output"]
        }], onContentChanged: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Output"]
        }], onSelectionChanged: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Output"]
        }], onFocus: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Output"]
        }], onBlur: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Output"]
        }], valueGetter: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"]
        }], valueSetter: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"]
        }], format: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"]
        }], theme: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"]
        }], modules: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"]
        }], debug: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"]
        }], readOnly: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"]
        }], placeholder: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"]
        }], maxLength: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"]
        }], minLength: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"]
        }], formats: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"]
        }], scrollingContainer: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"]
        }], bounds: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"]
        }], trackChanges: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"]
        }], classes: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"]
        }] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵsetClassMetadata"](QuillEditorComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"],
        args: [{
                encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_2__["ViewEncapsulation"].None,
                providers: [
                    {
                        multi: true,
                        provide: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NG_VALUE_ACCESSOR"],
                        // eslint-disable-next-line @typescript-eslint/no-use-before-define
                        useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["forwardRef"])(() => QuillEditorComponent_1)
                    },
                    {
                        multi: true,
                        provide: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NG_VALIDATORS"],
                        // eslint-disable-next-line @typescript-eslint/no-use-before-define
                        useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["forwardRef"])(() => QuillEditorComponent_1)
                    }
                ],
                selector: 'quill-editor',
                template: `
  <ng-content select="[quill-editor-toolbar]"></ng-content>
`
            }]
    }], function () { return [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["ElementRef"], decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"],
                args: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ElementRef"]]
            }] }, { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["DomSanitizer"], decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"],
                args: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["DomSanitizer"]]
            }] }, { type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"],
                args: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["DOCUMENT"]]
            }] }, { type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"],
                args: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["PLATFORM_ID"]]
            }] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Renderer2"], decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"],
                args: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["Renderer2"]]
            }] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["NgZone"], decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"],
                args: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgZone"]]
            }] }, { type: QuillService, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"],
                args: [QuillService]
            }] }]; }, null); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵsetClassMetadata"](QuillViewHTMLComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"],
        args: [{
                encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_2__["ViewEncapsulation"].None,
                selector: 'quill-view-html',
                template: `
  <div class="ql-container" [ngClass]="themeClass">
    <div class="ql-editor" [innerHTML]="innerHTML">
    </div>
  </div>
`,
                styles: [`
.ql-container.ngx-quill-view-html {
  border: 0;
}
`]
            }]
    }], function () { return [{ type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["DomSanitizer"], decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"],
                args: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["DomSanitizer"]]
            }] }, { type: QuillService }]; }, { content: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"]
        }], theme: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"]
        }] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵsetClassMetadata"](QuillViewComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"],
        args: [{
                encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_2__["ViewEncapsulation"].None,
                selector: 'quill-view',
                template: `
`,
                styles: [`
.ql-container.ngx-quill-view {
  border: 0;
}
`]
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"],
                args: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["PLATFORM_ID"]]
            }] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Renderer2"], decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"],
                args: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["Renderer2"]]
            }] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["ElementRef"], decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"],
                args: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ElementRef"]]
            }] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["NgZone"], decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"],
                args: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgZone"]]
            }] }, { type: QuillService, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"],
                args: [QuillService]
            }] }]; }, { strict: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"]
        }], customModules: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"]
        }], customOptions: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"]
        }], preserveWhitespace: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"]
        }], format: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"]
        }], theme: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"]
        }], modules: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"]
        }], debug: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"]
        }], formats: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"]
        }], content: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"]
        }] }); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](QuillModule, { declarations: function () { return [QuillEditorComponent, QuillViewComponent, QuillViewHTMLComponent]; }, imports: function () { return [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"]]; }, exports: function () { return [QuillEditorComponent, QuillViewComponent, QuillViewHTMLComponent]; } }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵsetClassMetadata"](QuillModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"],
        args: [{
                declarations: [
                    QuillEditorComponent,
                    QuillViewComponent,
                    QuillViewHTMLComponent
                ],
                exports: [QuillEditorComponent, QuillViewComponent, QuillViewHTMLComponent],
                imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"]],
                providers: [QuillService]
            }]
    }], null, null); })();

/*
 * Public API Surface of ngx-quill
 */

/**
 * Generated bundle index. Do not edit.
 */



//# sourceMappingURL=ngx-quill.js.map

/***/ }),

/***/ "./src/app/handy/modules/handy-form/components/form-caption-divider/form-caption-divider.component.ts":
/*!************************************************************************************************************!*\
  !*** ./src/app/handy/modules/handy-form/components/form-caption-divider/form-caption-divider.component.ts ***!
  \************************************************************************************************************/
/*! exports provided: FormCaptionDividerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormCaptionDividerComponent", function() { return FormCaptionDividerComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/flex-layout/flex */ "./node_modules/@angular/flex-layout/esm2015/flex.js");
/* harmony import */ var _form_divider_form_divider_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../form-divider/form-divider.component */ "./src/app/handy/modules/handy-form/components/form-divider/form-divider.component.ts");
/* harmony import */ var _form_caption_form_caption_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../form-caption/form-caption.component */ "./src/app/handy/modules/handy-form/components/form-caption/form-caption.component.ts");





const _c0 = ["*"];
class FormCaptionDividerComponent {
    constructor() { }
    ngOnInit() {
    }
}
FormCaptionDividerComponent.ɵfac = function FormCaptionDividerComponent_Factory(t) { return new (t || FormCaptionDividerComponent)(); };
FormCaptionDividerComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: FormCaptionDividerComponent, selectors: [["form-caption-divider"]], ngContentSelectors: _c0, decls: 4, vars: 0, consts: [["fxLayout", "row wrap"]], template: function FormCaptionDividerComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "form-divider");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "form-caption");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_1__["DefaultLayoutDirective"], _form_divider_form_divider_component__WEBPACK_IMPORTED_MODULE_2__["FormDividerComponent"], _form_caption_form_caption_component__WEBPACK_IMPORTED_MODULE_3__["FormCaptionComponent"]], styles: ["[_nghost-%COMP%] {\n  display: block;\n  width: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvaGFuZHkvbW9kdWxlcy9oYW5keS1mb3JtL2NvbXBvbmVudHMvZm9ybS1jYXB0aW9uLWRpdmlkZXIvZm9ybS1jYXB0aW9uLWRpdmlkZXIuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxjQUFBO0VBQ0EsV0FBQTtBQUNGIiwiZmlsZSI6InNyYy9hcHAvaGFuZHkvbW9kdWxlcy9oYW5keS1mb3JtL2NvbXBvbmVudHMvZm9ybS1jYXB0aW9uLWRpdmlkZXIvZm9ybS1jYXB0aW9uLWRpdmlkZXIuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdCB7XHJcbiAgZGlzcGxheTogYmxvY2s7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbn1cclxuIl19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](FormCaptionDividerComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'form-caption-divider',
                templateUrl: './form-caption-divider.component.html',
                styleUrls: ['./form-caption-divider.component.scss']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "./src/app/handy/modules/handy-form/components/form-caption/form-caption.component.ts":
/*!********************************************************************************************!*\
  !*** ./src/app/handy/modules/handy-form/components/form-caption/form-caption.component.ts ***!
  \********************************************************************************************/
/*! exports provided: FormCaptionComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormCaptionComponent", function() { return FormCaptionComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


const _c0 = ["*"];
class FormCaptionComponent {
    constructor() { }
    ngOnInit() {
    }
}
FormCaptionComponent.ɵfac = function FormCaptionComponent_Factory(t) { return new (t || FormCaptionComponent)(); };
FormCaptionComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: FormCaptionComponent, selectors: [["form-caption"]], ngContentSelectors: _c0, decls: 3, vars: 0, consts: [[1, "mat-caption", 2, "padding-bottom", "16px", "width", "100%"]], template: function FormCaptionComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["[_nghost-%COMP%] {\n  display: block;\n  width: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvaGFuZHkvbW9kdWxlcy9oYW5keS1mb3JtL2NvbXBvbmVudHMvZm9ybS1jYXB0aW9uL2Zvcm0tY2FwdGlvbi5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGNBQUE7RUFDQSxXQUFBO0FBQ0YiLCJmaWxlIjoic3JjL2FwcC9oYW5keS9tb2R1bGVzL2hhbmR5LWZvcm0vY29tcG9uZW50cy9mb3JtLWNhcHRpb24vZm9ybS1jYXB0aW9uLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3Qge1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG4gIHdpZHRoOiAxMDAlO1xyXG59XHJcbiJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](FormCaptionComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'form-caption',
                templateUrl: './form-caption.component.html',
                styleUrls: ['./form-caption.component.scss']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "./src/app/handy/modules/handy-form/components/form-divider/form-divider.component.ts":
/*!********************************************************************************************!*\
  !*** ./src/app/handy/modules/handy-form/components/form-divider/form-divider.component.ts ***!
  \********************************************************************************************/
/*! exports provided: FormDividerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormDividerComponent", function() { return FormDividerComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/flex-layout/flex */ "./node_modules/@angular/flex-layout/esm2015/flex.js");
/* harmony import */ var _angular_material_divider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/divider */ "./node_modules/@angular/material/fesm2015/divider.js");




class FormDividerComponent {
    constructor() { }
    ngOnInit() {
    }
}
FormDividerComponent.ɵfac = function FormDividerComponent_Factory(t) { return new (t || FormDividerComponent)(); };
FormDividerComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: FormDividerComponent, selectors: [["form-divider"]], decls: 2, vars: 0, consts: [["fxLayout", "row", "fxLayoutAlign", "center center", 2, "height", "24px", "width", "100%"]], template: function FormDividerComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "mat-divider");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_1__["DefaultLayoutDirective"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_1__["DefaultLayoutAlignDirective"], _angular_material_divider__WEBPACK_IMPORTED_MODULE_2__["MatDivider"]], styles: ["[_nghost-%COMP%] {\n  display: block;\n  width: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvaGFuZHkvbW9kdWxlcy9oYW5keS1mb3JtL2NvbXBvbmVudHMvZm9ybS1kaXZpZGVyL2Zvcm0tZGl2aWRlci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGNBQUE7RUFDQSxXQUFBO0FBQ0YiLCJmaWxlIjoic3JjL2FwcC9oYW5keS9tb2R1bGVzL2hhbmR5LWZvcm0vY29tcG9uZW50cy9mb3JtLWRpdmlkZXIvZm9ybS1kaXZpZGVyLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3Qge1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG4gIHdpZHRoOiAxMDAlO1xyXG59XHJcbiJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](FormDividerComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'form-divider',
                templateUrl: './form-divider.component.html',
                styleUrls: ['./form-divider.component.scss']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "./src/app/handy/modules/handy-form/components/handy-check-box-input/handy-check-box-input.component.ts":
/*!**************************************************************************************************************!*\
  !*** ./src/app/handy/modules/handy-form/components/handy-check-box-input/handy-check-box-input.component.ts ***!
  \**************************************************************************************************************/
/*! exports provided: HandyCheckBoxInputComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HandyCheckBoxInputComponent", function() { return HandyCheckBoxInputComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _handy_ng_extenders_handy_form_contol__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @handy-ng/extenders/handy-form-contol */ "./src/app/handy/extenders/handy-form-contol.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _handy_ng_services__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @handy-ng/services */ "./src/app/handy/services/index.ts");
/* harmony import */ var _handy_form_handy_form_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../handy-form/handy-form.component */ "./src/app/handy/modules/handy-form/components/handy-form/handy-form.component.ts");
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/checkbox */ "./node_modules/@angular/material/fesm2015/checkbox.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/fesm2015/button.js");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/form-field */ "./node_modules/@angular/material/fesm2015/form-field.js");
/* harmony import */ var _modules_shared_components_handy_icon_handy_icon_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../../modules/shared/components/handy-icon/handy-icon.component */ "./src/app/modules/shared/components/handy-icon/handy-icon.component.ts");
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/tooltip */ "./node_modules/@angular/material/fesm2015/tooltip.js");
/* harmony import */ var _handy_ng_pipes_truncate_pipe__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @handy-ng/pipes/truncate.pipe */ "./src/app/handy/pipes/truncate.pipe.ts");













function HandyCheckBoxInputComponent_button_4_Template(rf, ctx) { if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HandyCheckBoxInputComponent_button_4_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r6); const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r5.handlePinClick(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "handy-icon", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("size", 16)("icon", ctx_r1._hasPinnedVal ? "lock" : "lock_open");
} }
function HandyCheckBoxInputComponent_span_5_Template(rf, ctx) { if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HandyCheckBoxInputComponent_span_5_Template_span_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r8); const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r7.triggerPrefixClick(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r2._prefixText);
} }
function HandyCheckBoxInputComponent_span_6_Template(rf, ctx) { if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HandyCheckBoxInputComponent_span_6_Template_span_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r10); const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r9.triggerSufixClick(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r3._sufixText);
} }
function HandyCheckBoxInputComponent_mat_error_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-error", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "truncate");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matTooltip", ctx_r4._fieldErr);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](2, 2, ctx_r4._fieldErr));
} }
const _c0 = ["*"];
class HandyCheckBoxInputComponent extends _handy_ng_extenders_handy_form_contol__WEBPACK_IMPORTED_MODULE_1__["HandyFormControl"] {
    constructor(ngControl, _handyNgUserService, _parentFormComponent) {
        super(ngControl, _handyNgUserService, _parentFormComponent);
        this.ngControl = ngControl;
        this._handyNgUserService = _handyNgUserService;
        this._parentFormComponent = _parentFormComponent;
        this._labelPosition = 'after';
        this._color = 'primary';
    }
    set labelPosition(position) {
        this._labelPosition = position;
    }
    set extraClass(className) {
        this._extraClass = className;
    }
    set color(color) {
        this._color = color;
    }
    ngOnInit() {
        super.ngOnInit();
    }
    ngOnDestroy() {
        super.ngOnDestroy();
    }
}
HandyCheckBoxInputComponent.ɵfac = function HandyCheckBoxInputComponent_Factory(t) { return new (t || HandyCheckBoxInputComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControl"], 10), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_handy_ng_services__WEBPACK_IMPORTED_MODULE_3__["HandyNgUserService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_handy_form_handy_form_component__WEBPACK_IMPORTED_MODULE_4__["HandyFormComponent"], 8)); };
HandyCheckBoxInputComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: HandyCheckBoxInputComponent, selectors: [["handy-check-box"]], inputs: { disabled: "disabled", extraClass: "extraClass", debounceTime: "debounceTime", fieldName: "fieldName", pinningValue: "pinningValue", disableFieldPin: "disableFieldPin", color: "color", labelPosition: "labelPosition" }, outputs: { valueChange: "valueChange", statusChange: "statusChange" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]], ngContentSelectors: _c0, decls: 8, vars: 10, consts: [["matInput", "", 3, "disabled", "ngModel", "color", "labelPosition", "ngModelChange", "focus"], ["inputField", "ngModel"], ["mat-icon-button", "", "matSuffix", "", 3, "click", 4, "ngIf"], ["matPrefix", "", 3, "click", 4, "ngIf"], ["matSuffix", "", 3, "click", 4, "ngIf"], [3, "matTooltip", 4, "ngIf"], ["mat-icon-button", "", "matSuffix", "", 3, "click"], [3, "size", "icon"], ["matPrefix", "", 3, "click"], ["matSuffix", "", 3, "click"], [3, "matTooltip"]], template: function HandyCheckBoxInputComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-checkbox", 0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function HandyCheckBoxInputComponent_Template_mat_checkbox_ngModelChange_1_listener($event) { return ctx._value = $event; })("ngModelChange", function HandyCheckBoxInputComponent_Template_mat_checkbox_ngModelChange_1_listener() { return ctx.updateChanges(); })("focus", function HandyCheckBoxInputComponent_Template_mat_checkbox_focus_1_listener() { return ctx.onTouched(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, HandyCheckBoxInputComponent_button_4_Template, 2, 2, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, HandyCheckBoxInputComponent_span_5_Template, 2, 1, "span", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, HandyCheckBoxInputComponent_span_6_Template, 2, 1, "span", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, HandyCheckBoxInputComponent_mat_error_7_Template, 3, 4, "mat-error", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassMap"](ctx._extraClass);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", ctx._isDisabled)("ngModel", ctx._value)("color", ctx._color)("labelPosition", ctx._labelPosition);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._handyNgUserService.loggedInStatus && ctx._pinningState && !ctx._disableFieldPin);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._prefixText && ctx._fieldStatus !== "PENDING" && !ctx._pinningState);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._sufixText && ctx._fieldStatus !== "PENDING" && !ctx._pinningState);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._fieldErr);
    } }, directives: [_angular_material_checkbox__WEBPACK_IMPORTED_MODULE_5__["MatCheckbox"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgModel"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["NgIf"], _angular_material_button__WEBPACK_IMPORTED_MODULE_7__["MatButton"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_8__["MatSuffix"], _modules_shared_components_handy_icon_handy_icon_component__WEBPACK_IMPORTED_MODULE_9__["HandyIconComponent"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_8__["MatPrefix"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_8__["MatError"], _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_10__["MatTooltip"]], pipes: [_handy_ng_pipes_truncate_pipe__WEBPACK_IMPORTED_MODULE_11__["TruncatePipe"]], styles: ["mat-checkbox[_ngcontent-%COMP%] {\n  padding-right: 0.825rem;\n}\n\n[_nghost-%COMP%] {\n  display: block;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvaGFuZHkvbW9kdWxlcy9oYW5keS1mb3JtL2NvbXBvbmVudHMvaGFuZHktY2hlY2stYm94LWlucHV0L2hhbmR5LWNoZWNrLWJveC1pbnB1dC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLHVCQUFBO0FBQ0o7O0FBQ0M7RUFDRSxjQUFBO0FBRUgiLCJmaWxlIjoic3JjL2FwcC9oYW5keS9tb2R1bGVzL2hhbmR5LWZvcm0vY29tcG9uZW50cy9oYW5keS1jaGVjay1ib3gtaW5wdXQvaGFuZHktY2hlY2stYm94LWlucHV0LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsibWF0LWNoZWNrYm94IHtcclxuICAgIHBhZGRpbmctcmlnaHQ6IC44MjVyZW07XHJcbn1cclxuIDpob3N0IHtcclxuICAgZGlzcGxheTogYmxvY2s7XHJcbiB9Il19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](HandyCheckBoxInputComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'handy-check-box',
                templateUrl: './handy-check-box-input.component.html',
                styleUrls: ['./handy-check-box-input.component.scss'],
                inputs: [
                    'disabled', 'extraClass',
                    'debounceTime', 'fieldName',
                    'pinningValue', 'disableFieldPin', 'color', 'labelPosition'
                ],
                outputs: [
                    'valueChange', 'statusChange',
                ]
            }]
    }], function () { return [{ type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControl"], decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
            }, {
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Self"]
            }] }, { type: _handy_ng_services__WEBPACK_IMPORTED_MODULE_3__["HandyNgUserService"] }, { type: _handy_form_handy_form_component__WEBPACK_IMPORTED_MODULE_4__["HandyFormComponent"], decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
            }] }]; }, { labelPosition: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], extraClass: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], color: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }] }); })();


/***/ }),

/***/ "./src/app/handy/modules/handy-form/components/handy-chip-input/handy-chip-input.component.ts":
/*!****************************************************************************************************!*\
  !*** ./src/app/handy/modules/handy-form/components/handy-chip-input/handy-chip-input.component.ts ***!
  \****************************************************************************************************/
/*! exports provided: HandyChipInputComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HandyChipInputComponent", function() { return HandyChipInputComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _handy_ng_extenders_handy_form_contol__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @handy-ng/extenders/handy-form-contol */ "./src/app/handy/extenders/handy-form-contol.ts");
/* harmony import */ var _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/cdk/keycodes */ "./node_modules/@angular/cdk/fesm2015/keycodes.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _handy_ng_services__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @handy-ng/services */ "./src/app/handy/services/index.ts");
/* harmony import */ var _handy_form_handy_form_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../handy-form/handy-form.component */ "./src/app/handy/modules/handy-form/components/handy-form/handy-form.component.ts");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/form-field */ "./node_modules/@angular/material/fesm2015/form-field.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_material_chips__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/chips */ "./node_modules/@angular/material/fesm2015/chips.js");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/input */ "./node_modules/@angular/material/fesm2015/input.js");
/* harmony import */ var _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/autocomplete */ "./node_modules/@angular/material/fesm2015/autocomplete.js");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/icon */ "./node_modules/@angular/material/fesm2015/icon.js");
/* harmony import */ var _modules_shared_components_handy_icon_handy_icon_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../../modules/shared/components/handy-icon/handy-icon.component */ "./src/app/modules/shared/components/handy-icon/handy-icon.component.ts");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/fesm2015/button.js");
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/progress-spinner */ "./node_modules/@angular/material/fesm2015/progress-spinner.js");
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/tooltip */ "./node_modules/@angular/material/fesm2015/tooltip.js");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/core */ "./node_modules/@angular/material/fesm2015/core.js");
/* harmony import */ var _handy_ng_pipes_truncate_pipe__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @handy-ng/pipes/truncate.pipe */ "./src/app/handy/pipes/truncate.pipe.ts");



















function HandyChipInputComponent_mat_label_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r0._label);
} }
function HandyChipInputComponent_mat_chip_5_mat_icon_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-icon", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "cancel");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function HandyChipInputComponent_mat_chip_5_Template(rf, ctx) { if (rf & 1) {
    const _r21 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-chip", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("removed", function HandyChipInputComponent_mat_chip_5_Template_mat_chip_removed_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r21); const i_r18 = ctx.index; const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r20.remove(i_r18); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, HandyChipInputComponent_mat_chip_5_mat_icon_2_Template, 2, 0, "mat-icon", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const singleVal_r17 = ctx.$implicit;
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", ctx_r3._isDisabled)("selectable", false)("removable", ctx_r3._removable);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", singleVal_r17, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r3._removable && !ctx_r3._isDisabled);
} }
function HandyChipInputComponent_handy_icon_8_Template(rf, ctx) { if (rf & 1) {
    const _r23 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "handy-icon", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HandyChipInputComponent_handy_icon_8_Template_handy_icon_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r23); const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r22.triggerPrefixClick(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("size", ctx_r5._prefixAndSufixIconSize)("icon", ctx_r5._prefixIcon);
} }
function HandyChipInputComponent_handy_icon_9_Template(rf, ctx) { if (rf & 1) {
    const _r25 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "handy-icon", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HandyChipInputComponent_handy_icon_9_Template_handy_icon_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r25); const ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r24.triggerSufixClick(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("size", ctx_r6._prefixAndSufixIconSize)("icon", ctx_r6._sufixIcon);
} }
function HandyChipInputComponent_button_10_Template(rf, ctx) { if (rf & 1) {
    const _r27 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HandyChipInputComponent_button_10_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r27); const ctx_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r26.handlePinClick(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "handy-icon", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("size", 16)("icon", ctx_r7._hasPinnedVal ? "lock" : "lock_open");
} }
function HandyChipInputComponent_span_11_Template(rf, ctx) { if (rf & 1) {
    const _r29 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HandyChipInputComponent_span_11_Template_span_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r29); const ctx_r28 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r28.triggerPrefixClick(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r8._prefixText);
} }
function HandyChipInputComponent_span_12_Template(rf, ctx) { if (rf & 1) {
    const _r31 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HandyChipInputComponent_span_12_Template_span_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r31); const ctx_r30 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r30.triggerSufixClick(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r9._sufixText);
} }
function HandyChipInputComponent_mat_progress_spinner_13_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "mat-progress-spinner", 26);
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("diameter", 16);
} }
function HandyChipInputComponent_mat_hint_14_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-hint", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r11._startHint);
} }
function HandyChipInputComponent_mat_hint_15_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-hint", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r12._endHint);
} }
function HandyChipInputComponent_mat_error_16_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-error", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "truncate");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matTooltip", ctx_r13._fieldErr);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](2, 2, ctx_r13._fieldErr));
} }
function HandyChipInputComponent_div_19_mat_option_1_Template(rf, ctx) { if (rf & 1) {
    const _r35 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-option", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("onSelectionChange", function HandyChipInputComponent_div_19_mat_option_1_Template_mat_option_onSelectionChange_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r35); const option_r33 = ctx.$implicit; const ctx_r34 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r34.autocompleteSelected.next({ selectEvent: $event, emitVal: option_r33.emitVal }); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const option_r33 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", option_r33.fieldValue);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](option_r33.displayValue);
} }
function HandyChipInputComponent_div_19_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, HandyChipInputComponent_div_19_mat_option_1_Template, 2, 2, "mat-option", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](2, 1, ctx_r15._simpleAutocomplete));
} }
function HandyChipInputComponent_div_20_mat_optgroup_1_mat_option_1_Template(rf, ctx) { if (rf & 1) {
    const _r41 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-option", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("onSelectionChange", function HandyChipInputComponent_div_20_mat_optgroup_1_mat_option_1_Template_mat_option_onSelectionChange_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r41); const option_r39 = ctx.$implicit; const ctx_r40 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3); return ctx_r40.autocompleteSelected.next({ selectEvent: $event, emitVal: option_r39.emitVal }); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const option_r39 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", option_r39.fieldValue);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", option_r39.displayValue, " ");
} }
function HandyChipInputComponent_div_20_mat_optgroup_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-optgroup", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, HandyChipInputComponent_div_20_mat_optgroup_1_mat_option_1_Template, 2, 2, "mat-option", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const group_r37 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("label", group_r37.groupName);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", group_r37.groupOptions);
} }
function HandyChipInputComponent_div_20_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, HandyChipInputComponent_div_20_mat_optgroup_1_Template, 2, 2, "mat-optgroup", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](2, 1, ctx_r16._groupAutocomplete));
} }
class HandyChipInputComponent extends _handy_ng_extenders_handy_form_contol__WEBPACK_IMPORTED_MODULE_1__["HandyFormControl"] {
    constructor(ngControl, _handyNgUserService, _parentFormComponent) {
        super(ngControl, _handyNgUserService, _parentFormComponent);
        this.ngControl = ngControl;
        this._handyNgUserService = _handyNgUserService;
        this._parentFormComponent = _parentFormComponent;
        this._removable = true;
        this._addOnBlur = true;
        this.separatorKeysCodes = [_angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_2__["ENTER"]];
    }
    ngOnInit() {
        super.ngOnInit();
    }
    set removable(val) {
        this._removable = val;
    }
    set addOnBlur(val) {
        this._addOnBlur = val;
    }
    add(event) {
        const input = event.input;
        const value = event.value;
        if (typeof value === 'string' && value.trim()) {
            let originalValue = this._value;
            if (!Array.isArray(originalValue)) {
                originalValue = [];
            }
            originalValue.push(value.trim());
            this._value = originalValue;
        }
        this.updateChanges();
        this.onTouched();
        // Reset the input value
        if (input) {
            input.value = null;
        }
    }
    remove(index) {
        let originalValue = this._value;
        if (!Array.isArray(originalValue)) {
            originalValue = [];
        }
        if (index >= 0) {
            originalValue.splice(index, 1);
            this._value = originalValue;
        }
        this.updateChanges();
        this.onTouched();
    }
    ngOnDestroy() {
        super.ngOnDestroy();
    }
}
HandyChipInputComponent.ɵfac = function HandyChipInputComponent_Factory(t) { return new (t || HandyChipInputComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_3__["NgControl"], 10), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_handy_ng_services__WEBPACK_IMPORTED_MODULE_4__["HandyNgUserService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_handy_form_handy_form_component__WEBPACK_IMPORTED_MODULE_5__["HandyFormComponent"], 8)); };
HandyChipInputComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: HandyChipInputComponent, selectors: [["handy-chip-input"]], inputs: { appearance: "appearance", label: "label", placeholder: "placeholder", disabled: "disabled", prefixText: "prefixText", sufixText: "sufixText", prefixIcon: "prefixIcon", sufixIcon: "sufixIcon", disableFieldStateMemory: "disableFieldStateMemory", debounceTime: "debounceTime", startHint: "startHint", endHint: "endHint", fieldName: "fieldName", pinningValue: "pinningValue", disableFieldPin: "disableFieldPin", autocomplete: "autocomplete", simpleAutoCompleteFilter: "simpleAutoCompleteFilter", removable: "removable", addOnBlur: "addOnBlur" }, outputs: { valueChange: "valueChange", statusChange: "statusChange", prefixClick: "prefixClick", sufixClick: "sufixClick", autocompleteSelected: "autocompleteSelected" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]], decls: 21, vars: 23, consts: [[3, "appearance"], [4, "ngIf"], ["ngDefaultControl", "", 3, "disabled", "ngModel", "ngModelChange"], ["chipList", "", "inputField", "ngModel"], [3, "disabled", "selectable", "removable", "removed", 4, "ngFor", "ngForOf"], ["matInput", "", 3, "matAutocomplete", "disabled", "type", "placeholder", "matChipInputFor", "matChipInputSeparatorKeyCodes", "matChipInputAddOnBlur", "focus", "click", "keyup", "matChipInputTokenEnd"], ["inputElmRef", ""], ["matPrefix", "", 3, "size", "icon", "click", 4, "ngIf"], ["matSuffix", "", 3, "size", "icon", "click", 4, "ngIf"], ["mat-icon-button", "", "matSuffix", "", 3, "click", 4, "ngIf"], ["matPrefix", "", 3, "click", 4, "ngIf"], ["matSuffix", "", 3, "click", 4, "ngIf"], ["matSuffix", "", "color", "primary", "mode", "indeterminate", 3, "diameter", 4, "ngIf"], ["align", "start", 4, "ngIf"], ["align", "end", 4, "ngIf"], [3, "matTooltip", 4, "ngIf"], ["auto", "matAutocomplete"], [3, "disabled", "selectable", "removable", "removed"], ["matChipRemove", "", 4, "ngIf"], ["matChipRemove", ""], ["matPrefix", "", 3, "size", "icon", "click"], ["matSuffix", "", 3, "size", "icon", "click"], ["mat-icon-button", "", "matSuffix", "", 3, "click"], [3, "size", "icon"], ["matPrefix", "", 3, "click"], ["matSuffix", "", 3, "click"], ["matSuffix", "", "color", "primary", "mode", "indeterminate", 3, "diameter"], ["align", "start"], ["align", "end"], [3, "matTooltip"], [3, "value", "onSelectionChange", 4, "ngFor", "ngForOf"], [3, "value", "onSelectionChange"], [3, "label", 4, "ngFor", "ngForOf"], [3, "label"]], template: function HandyChipInputComponent_Template(rf, ctx) { if (rf & 1) {
        const _r42 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-form-field", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, HandyChipInputComponent_mat_label_1_Template, 2, 1, "mat-label", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "mat-chip-list", 2, 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function HandyChipInputComponent_Template_mat_chip_list_ngModelChange_2_listener($event) { return ctx._value = $event; })("ngModelChange", function HandyChipInputComponent_Template_mat_chip_list_ngModelChange_2_listener() { return ctx.updateChanges(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, HandyChipInputComponent_mat_chip_5_Template, 3, 5, "mat-chip", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "input", 5, 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("focus", function HandyChipInputComponent_Template_input_focus_6_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r42); const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](7); return ctx.asignInputElm(_r4); })("click", function HandyChipInputComponent_Template_input_click_6_listener() { return ctx.asignCaretPos(); })("keyup", function HandyChipInputComponent_Template_input_keyup_6_listener() { return ctx.asignCaretPos(); })("focus", function HandyChipInputComponent_Template_input_focus_6_listener() { return ctx._parseAutocompleteData(); })("matChipInputTokenEnd", function HandyChipInputComponent_Template_input_matChipInputTokenEnd_6_listener($event) { return ctx.add($event); })("focus", function HandyChipInputComponent_Template_input_focus_6_listener() { return ctx.onTouched(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](8, HandyChipInputComponent_handy_icon_8_Template, 1, 2, "handy-icon", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, HandyChipInputComponent_handy_icon_9_Template, 1, 2, "handy-icon", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](10, HandyChipInputComponent_button_10_Template, 2, 2, "button", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, HandyChipInputComponent_span_11_Template, 2, 1, "span", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](12, HandyChipInputComponent_span_12_Template, 2, 1, "span", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](13, HandyChipInputComponent_mat_progress_spinner_13_Template, 1, 1, "mat-progress-spinner", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](14, HandyChipInputComponent_mat_hint_14_Template, 2, 1, "mat-hint", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](15, HandyChipInputComponent_mat_hint_15_Template, 2, 1, "mat-hint", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](16, HandyChipInputComponent_mat_error_16_Template, 3, 4, "mat-error", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "mat-autocomplete", null, 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](19, HandyChipInputComponent_div_19_Template, 3, 3, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](20, HandyChipInputComponent_div_20_Template, 3, 3, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](3);
        const _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("appearance", ctx._appearance);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._label);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", ctx._isDisabled)("ngModel", ctx._value);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx._value);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matAutocomplete", _r14)("disabled", ctx._isDisabled)("type", "text")("placeholder", ctx._placeholder)("matChipInputFor", _r1)("matChipInputSeparatorKeyCodes", ctx.separatorKeysCodes)("matChipInputAddOnBlur", ctx._addOnBlur);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._prefixIcon && ctx._fieldStatus !== "PENDING" && !ctx._pinningState);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._sufixIcon && ctx._fieldStatus !== "PENDING" && !ctx._pinningState);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._handyNgUserService.loggedInStatus && ctx._pinningState && !ctx._disableFieldPin);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._prefixText && ctx._fieldStatus !== "PENDING" && !ctx._pinningState);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._sufixText && ctx._fieldStatus !== "PENDING" && !ctx._pinningState);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._fieldStatus === "PENDING" && !ctx._pinningState);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._startHint);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._endHint);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._fieldErr);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._hasAutocomplete && ctx._autocompleteType === "simple");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._hasAutocomplete && ctx._autocompleteType === "group");
    } }, directives: [_angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__["MatFormField"], _angular_common__WEBPACK_IMPORTED_MODULE_7__["NgIf"], _angular_material_chips__WEBPACK_IMPORTED_MODULE_8__["MatChipList"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NgModel"], _angular_common__WEBPACK_IMPORTED_MODULE_7__["NgForOf"], _angular_material_input__WEBPACK_IMPORTED_MODULE_9__["MatInput"], _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_10__["MatAutocompleteTrigger"], _angular_material_chips__WEBPACK_IMPORTED_MODULE_8__["MatChipInput"], _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_10__["MatAutocomplete"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__["MatLabel"], _angular_material_chips__WEBPACK_IMPORTED_MODULE_8__["MatChip"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_11__["MatIcon"], _angular_material_chips__WEBPACK_IMPORTED_MODULE_8__["MatChipRemove"], _modules_shared_components_handy_icon_handy_icon_component__WEBPACK_IMPORTED_MODULE_12__["HandyIconComponent"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__["MatPrefix"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__["MatSuffix"], _angular_material_button__WEBPACK_IMPORTED_MODULE_13__["MatButton"], _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_14__["MatProgressSpinner"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__["MatHint"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__["MatError"], _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_15__["MatTooltip"], _angular_material_core__WEBPACK_IMPORTED_MODULE_16__["MatOption"], _angular_material_core__WEBPACK_IMPORTED_MODULE_16__["MatOptgroup"]], pipes: [_handy_ng_pipes_truncate_pipe__WEBPACK_IMPORTED_MODULE_17__["TruncatePipe"], _angular_common__WEBPACK_IMPORTED_MODULE_7__["AsyncPipe"]], styles: ["[_nghost-%COMP%] {\n  display: block;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvaGFuZHkvbW9kdWxlcy9oYW5keS1mb3JtL2NvbXBvbmVudHMvaGFuZHktY2hpcC1pbnB1dC9oYW5keS1jaGlwLWlucHV0LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFDO0VBQ0UsY0FBQTtBQUNIIiwiZmlsZSI6InNyYy9hcHAvaGFuZHkvbW9kdWxlcy9oYW5keS1mb3JtL2NvbXBvbmVudHMvaGFuZHktY2hpcC1pbnB1dC9oYW5keS1jaGlwLWlucHV0LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiIDpob3N0IHtcclxuICAgZGlzcGxheTogYmxvY2s7XHJcbiB9Il19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](HandyChipInputComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'handy-chip-input',
                templateUrl: './handy-chip-input.component.html',
                styleUrls: ['./handy-chip-input.component.scss'],
                inputs: [
                    'appearance', 'label', 'placeholder', 'disabled',
                    'prefixText', 'sufixText', 'prefixIcon',
                    'sufixIcon', 'disableFieldStateMemory',
                    'debounceTime', 'startHint', 'endHint', 'fieldName',
                    'pinningValue', 'disableFieldPin', 'autocomplete', 'simpleAutoCompleteFilter',
                    'removable', 'addOnBlur'
                ],
                outputs: [
                    'valueChange', 'statusChange', 'prefixClick', 'sufixClick', 'autocompleteSelected'
                ]
            }]
    }], function () { return [{ type: _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NgControl"], decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
            }, {
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Self"]
            }] }, { type: _handy_ng_services__WEBPACK_IMPORTED_MODULE_4__["HandyNgUserService"] }, { type: _handy_form_handy_form_component__WEBPACK_IMPORTED_MODULE_5__["HandyFormComponent"], decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
            }] }]; }, { removable: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
            args: ['removable']
        }], addOnBlur: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
            args: ['addOnBlur']
        }] }); })();


/***/ }),

/***/ "./src/app/handy/modules/handy-form/components/handy-custom-file-input/handy-custom-file-input.component.ts":
/*!******************************************************************************************************************!*\
  !*** ./src/app/handy/modules/handy-form/components/handy-custom-file-input/handy-custom-file-input.component.ts ***!
  \******************************************************************************************************************/
/*! exports provided: HandyCustomFileInputComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HandyCustomFileInputComponent", function() { return HandyCustomFileInputComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _handy_ng_extenders_handy_form_contol__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @handy-ng/extenders/handy-form-contol */ "./src/app/handy/extenders/handy-form-contol.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _handy_ng_services__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @handy-ng/services */ "./src/app/handy/services/index.ts");
/* harmony import */ var _handy_form_handy_form_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../handy-form/handy-form.component */ "./src/app/handy/modules/handy-form/components/handy-form/handy-form.component.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _modules_shared_components_buttons_icon_btn_icon_btn_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../../modules/shared/components/buttons/icon-btn/icon-btn.component */ "./src/app/modules/shared/components/buttons/icon-btn/icon-btn.component.ts");
/* harmony import */ var _directives_file_upload_directive__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../directives/file-upload.directive */ "./src/app/handy/modules/handy-form/directives/file-upload.directive.ts");
/* harmony import */ var _angular_flex_layout_extended__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/flex-layout/extended */ "./node_modules/@angular/flex-layout/esm2015/extended.js");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/form-field */ "./node_modules/@angular/material/fesm2015/form-field.js");
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/tooltip */ "./node_modules/@angular/material/fesm2015/tooltip.js");
/* harmony import */ var _handy_ng_pipes_truncate_pipe__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @handy-ng/pipes/truncate.pipe */ "./src/app/handy/pipes/truncate.pipe.ts");














const _c0 = ["uploadHandler"];
function HandyCustomFileInputComponent_mat_error_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-error", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "truncate");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matTooltip", ctx_r1._fieldErr);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](2, 2, ctx_r1._fieldErr));
} }
const _c1 = ["*"];
class HandyCustomFileInputComponent extends _handy_ng_extenders_handy_form_contol__WEBPACK_IMPORTED_MODULE_1__["HandyFormControl"] {
    constructor(ngControl, _handyNgUserService, _parentFormComponent, _handyNgConfigService) {
        super(ngControl, _handyNgUserService, _parentFormComponent);
        this.ngControl = ngControl;
        this._handyNgUserService = _handyNgUserService;
        this._parentFormComponent = _parentFormComponent;
        this._handyNgConfigService = _handyNgConfigService;
        this._uploading = false;
        this._hasAsignedValidator = false;
        this._internalUploadEventsSub = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.allowedFileTypes = this._handyNgConfigService.data.fileUpload.allowedFileTypes;
        this._maxFiles = 1;
    }
    set maxFiles(maxFiles) {
        this._maxFiles = maxFiles;
    }
    get hasFiles() {
        if (Array.isArray(this._value)) {
            return this._value.length > 0;
        }
        return false;
    }
    ngOnInit() {
        super.ngOnInit();
    }
    _addFileUploadValidator() {
        if (this._hasAsignedValidator) {
            return;
        }
        this._hasAsignedValidator = true;
        this.ngControl.control.setAsyncValidators([
            (control) => {
                if (!this._uploading) {
                    return Promise.resolve(null);
                }
                return new Promise((resolve, reject) => {
                    this._internalUploadEventsSub.subscribe(event => {
                        if (event.type === 'finish') {
                            resolve(null);
                        }
                    });
                });
            }
        ]);
    }
    _addFilesToValue(files) {
        if (!this._value) {
            this._value = [];
        }
        let filesLen = files.length;
        for (let i = 0; i < filesLen; i++) {
            const singleFile = files[i];
            this._value.push(singleFile);
        }
    }
    handleUpload(uploadEvent) {
        this._internalUploadEventsSub.next(uploadEvent);
        let { type, files } = uploadEvent;
        switch (type) {
            case 'start':
                this._addFileUploadValidator();
                this._uploading = true;
                this.onTouched();
                this._addFilesToValue(files);
                break;
            case 'finish':
                this._uploading = false;
                break;
            default:
                break;
        }
        this.updateChanges();
    }
    removeFile(id) {
        if (!this._value) {
            return;
        }
        let tempVal = (this._value).filter(value => {
            return value._id !== id;
        });
        this._value = tempVal;
        this.updateChanges();
    }
    trigUppload() {
        if (this.__invisibleHandler) {
            this.__invisibleHandler.triggerUploadDialog();
        }
    }
    ngOnDestroy() {
        super.ngOnDestroy();
        this._internalUploadEventsSub.complete();
    }
}
HandyCustomFileInputComponent.ɵfac = function HandyCustomFileInputComponent_Factory(t) { return new (t || HandyCustomFileInputComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_3__["NgControl"], 10), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_handy_ng_services__WEBPACK_IMPORTED_MODULE_4__["HandyNgUserService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_handy_form_handy_form_component__WEBPACK_IMPORTED_MODULE_5__["HandyFormComponent"], 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_handy_ng_services__WEBPACK_IMPORTED_MODULE_4__["HandyNgConfigService"])); };
HandyCustomFileInputComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: HandyCustomFileInputComponent, selectors: [["handy-custom-file-input"]], viewQuery: function HandyCustomFileInputComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, true);
    } if (rf & 2) {
        var _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.__invisibleHandler = _t.first);
    } }, inputs: { disabled: "disabled", debounceTime: "debounceTime", fieldName: "fieldName", pinningValue: "pinningValue", disableFieldPin: "disableFieldPin", maxFiles: "maxFiles", allowedFileTypes: "allowedFileTypes", thumbs: "thumbs", accessRules: "accessRules" }, outputs: { valueChange: "valueChange", statusChange: "statusChange", prefixClick: "prefixClick", sufixClick: "sufixClick" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]], ngContentSelectors: _c1, decls: 6, vars: 9, consts: [["type", "hidden", 3, "ngModel", "ngModelChange"], ["inputField", "ngModel"], [3, "matTooltip", 4, "ngIf"], ["fileUpload", "", "icon", "cloud_upload", 3, "fxHide", "allowedFileTypes", "maxFiles", "accessRules", "thumbs", "disabled", "disabledUpload", "uploadEvent"], ["uploadHandler", "fileUpload"], [3, "matTooltip"]], template: function HandyCustomFileInputComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "input", 0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function HandyCustomFileInputComponent_Template_input_ngModelChange_0_listener($event) { return ctx._value = $event; })("ngModelChange", function HandyCustomFileInputComponent_Template_input_ngModelChange_0_listener() { return ctx.updateChanges(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, HandyCustomFileInputComponent_mat_error_2_Template, 3, 4, "mat-error", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "icon-btn", 3, 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("uploadEvent", function HandyCustomFileInputComponent_Template_icon_btn_uploadEvent_3_listener($event) { return ctx.handleUpload($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](5);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx._value);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._fieldErr);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("fxHide", true)("allowedFileTypes", ctx.allowedFileTypes)("maxFiles", ctx._maxFiles)("accessRules", ctx.accessRules)("thumbs", ctx.thumbs)("disabled", ctx._isDisabled)("disabledUpload", ctx._isDisabled);
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NgModel"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["NgIf"], _modules_shared_components_buttons_icon_btn_icon_btn_component__WEBPACK_IMPORTED_MODULE_7__["IconBtnComponent"], _directives_file_upload_directive__WEBPACK_IMPORTED_MODULE_8__["FileUploadDirective"], _angular_flex_layout_extended__WEBPACK_IMPORTED_MODULE_9__["DefaultShowHideDirective"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_10__["MatError"], _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_11__["MatTooltip"]], pipes: [_handy_ng_pipes_truncate_pipe__WEBPACK_IMPORTED_MODULE_12__["TruncatePipe"]], styles: ["[_nghost-%COMP%] {\n  display: block;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvaGFuZHkvbW9kdWxlcy9oYW5keS1mb3JtL2NvbXBvbmVudHMvaGFuZHktY3VzdG9tLWZpbGUtaW5wdXQvaGFuZHktY3VzdG9tLWZpbGUtaW5wdXQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxjQUFBO0FBQ0YiLCJmaWxlIjoic3JjL2FwcC9oYW5keS9tb2R1bGVzL2hhbmR5LWZvcm0vY29tcG9uZW50cy9oYW5keS1jdXN0b20tZmlsZS1pbnB1dC9oYW5keS1jdXN0b20tZmlsZS1pbnB1dC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIjpob3N0IHtcclxuICBkaXNwbGF5OiBibG9jaztcclxufSJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](HandyCustomFileInputComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'handy-custom-file-input',
                templateUrl: './handy-custom-file-input.component.html',
                styleUrls: ['./handy-custom-file-input.component.scss'],
                inputs: [
                    'disabled', 'debounceTime', 'fieldName',
                    'pinningValue', 'disableFieldPin',
                    'maxFiles', 'allowedFileTypes', 'thumbs', 'accessRules'
                ],
                outputs: [
                    'valueChange', 'statusChange', 'prefixClick', 'sufixClick'
                ],
            }]
    }], function () { return [{ type: _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NgControl"], decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
            }, {
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Self"]
            }] }, { type: _handy_ng_services__WEBPACK_IMPORTED_MODULE_4__["HandyNgUserService"] }, { type: _handy_form_handy_form_component__WEBPACK_IMPORTED_MODULE_5__["HandyFormComponent"], decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
            }] }, { type: _handy_ng_services__WEBPACK_IMPORTED_MODULE_4__["HandyNgConfigService"] }]; }, { allowedFileTypes: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
            args: ['allowedFileTypes']
        }], thumbs: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
            args: ['thumbs']
        }], accessRules: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
            args: ['accessRules']
        }], maxFiles: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
            args: ['maxFiles']
        }], __invisibleHandler: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: ['uploadHandler']
        }] }); })();


/***/ }),

/***/ "./src/app/handy/modules/handy-form/components/handy-date-input/handy-date-input.component.ts":
/*!****************************************************************************************************!*\
  !*** ./src/app/handy/modules/handy-form/components/handy-date-input/handy-date-input.component.ts ***!
  \****************************************************************************************************/
/*! exports provided: HandyDateInputComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HandyDateInputComponent", function() { return HandyDateInputComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _handy_ng_extenders_handy_form_contol__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @handy-ng/extenders/handy-form-contol */ "./src/app/handy/extenders/handy-form-contol.ts");
/* harmony import */ var _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/cdk/portal */ "./node_modules/@angular/cdk/fesm2015/portal.js");
/* harmony import */ var _input_calendar_input_calendar_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./input-calendar/input-calendar.component */ "./src/app/handy/modules/handy-form/components/handy-date-input/input-calendar/input-calendar.component.ts");
/* harmony import */ var _input_calendar_date_input_injection_token__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./input-calendar/date-input-injection-token */ "./src/app/handy/modules/handy-form/components/handy-date-input/input-calendar/date-input-injection-token.ts");
/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! moment-timezone */ "./node_modules/moment-timezone/index.js");
/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(moment_timezone__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _handy_ng_pipes_handy_date_pipe__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @handy-ng/pipes/handy-date.pipe */ "./src/app/handy/pipes/handy-date.pipe.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _handy_ng_services__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @handy-ng/services */ "./src/app/handy/services/index.ts");
/* harmony import */ var _handy_form_handy_form_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./../handy-form/handy-form.component */ "./src/app/handy/modules/handy-form/components/handy-form/handy-form.component.ts");
/* harmony import */ var _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/cdk/overlay */ "./node_modules/@angular/cdk/fesm2015/overlay.js");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/form-field */ "./node_modules/@angular/material/fesm2015/form-field.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/input */ "./node_modules/@angular/material/fesm2015/input.js");
/* harmony import */ var _modules_shared_components_handy_icon_handy_icon_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../../modules/shared/components/handy-icon/handy-icon.component */ "./src/app/modules/shared/components/handy-icon/handy-icon.component.ts");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/fesm2015/button.js");
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/progress-spinner */ "./node_modules/@angular/material/fesm2015/progress-spinner.js");
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/tooltip */ "./node_modules/@angular/material/fesm2015/tooltip.js");
/* harmony import */ var _handy_ng_pipes_truncate_pipe__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @handy-ng/pipes/truncate.pipe */ "./src/app/handy/pipes/truncate.pipe.ts");





















const _c0 = ["inputField"];
function HandyDateInputComponent_mat_label_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r0._label);
} }
function HandyDateInputComponent_handy_icon_4_Template(rf, ctx) { if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "handy-icon", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HandyDateInputComponent_handy_icon_4_Template_handy_icon_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r12); const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r11.triggerPrefixClick(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("size", ctx_r2._prefixAndSufixIconSize)("icon", ctx_r2._prefixIcon);
} }
function HandyDateInputComponent_handy_icon_5_Template(rf, ctx) { if (rf & 1) {
    const _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "handy-icon", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HandyDateInputComponent_handy_icon_5_Template_handy_icon_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r14); const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r13.triggerSufixClick(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("size", ctx_r3._prefixAndSufixIconSize)("icon", ctx_r3._sufixIcon);
} }
function HandyDateInputComponent_button_6_Template(rf, ctx) { if (rf & 1) {
    const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HandyDateInputComponent_button_6_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r16); const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r15.handlePinClick(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "handy-icon", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("size", 16)("icon", ctx_r4._hasPinnedVal ? "lock" : "lock_open");
} }
function HandyDateInputComponent_span_7_Template(rf, ctx) { if (rf & 1) {
    const _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HandyDateInputComponent_span_7_Template_span_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r18); const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r17.triggerPrefixClick(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r5._prefixText);
} }
function HandyDateInputComponent_span_8_Template(rf, ctx) { if (rf & 1) {
    const _r20 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HandyDateInputComponent_span_8_Template_span_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r20); const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r19.triggerSufixClick(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r6._sufixText);
} }
function HandyDateInputComponent_mat_progress_spinner_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "mat-progress-spinner", 19);
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("diameter", 16);
} }
function HandyDateInputComponent_mat_hint_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-hint", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r8._startHint);
} }
function HandyDateInputComponent_mat_hint_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-hint", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r9._endHint);
} }
function HandyDateInputComponent_mat_error_12_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-error", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "truncate");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matTooltip", ctx_r10._fieldErr);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](2, 2, ctx_r10._fieldErr));
} }
class HandyDateInputComponent extends _handy_ng_extenders_handy_form_contol__WEBPACK_IMPORTED_MODULE_1__["HandyFormControl"] {
    constructor(ngControl, _handyNgUserService, _parentFormComponent, handyNgLayoutService, _injector, _overlay, _datePipe) {
        super(ngControl, _handyNgUserService, _parentFormComponent);
        this.ngControl = ngControl;
        this._handyNgUserService = _handyNgUserService;
        this._parentFormComponent = _parentFormComponent;
        this.handyNgLayoutService = handyNgLayoutService;
        this._injector = _injector;
        this._overlay = _overlay;
        this._datePipe = _datePipe;
        this._pipeSetting = 'd MMM y';
        this._pipeWithTimeSetting = 'd MMM y, HH:mm';
        this._finalPipeSetting = this._pipeSetting;
        this._sufixIcon = 'today';
        this._showTimeZone = true;
        this._selectableTimezone = false;
        this._getTime = false;
        this._multiSelect = false;
        this._simpleFilter = [];
        this._timeZone = moment_timezone__WEBPACK_IMPORTED_MODULE_5__["tz"].guess();
        this.open = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.close = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    set showTimeZone(set) {
        this._showTimeZone = set;
    }
    set selectableTimezone(set) {
        this._selectableTimezone = set;
    }
    set getTime(set) {
        this._getTime = set;
        this._finalPipeSetting = (set) ? this._pipeWithTimeSetting : this._pipeSetting;
        this._showDate();
    }
    set multiSelect(set) {
        this._multiSelect = set;
        if (set) {
            this.getTime = false;
        }
    }
    set minDate(min) {
        this._minDate = min;
    }
    set maxDate(max) {
        this._maxDate = max;
    }
    set startDate(start) {
        this._startDate = start;
    }
    set setTime(set) {
        this._setTime = set;
    }
    set minTime(min) {
        this._minTime = min;
    }
    set maxTime(max) {
        this._maxTime = max;
    }
    set simpleFilter(filter) {
        this._simpleFilter = filter;
    }
    set timeZone(zone) {
        this._timeZone = zone;
    }
    set customFilter(filter) {
        this._customFilter = filter;
    }
    set dateClass(classFilter) {
        this._dateClass = classFilter;
    }
    preventKeyInput(event) {
        event.preventDefault();
    }
    onFocus(event) {
        // Returns an OverlayRef (which is a PortalHost)
        if (!this._overLayRef) {
            this._overLayRef = this._overlay.create({
                width: '300px',
                positionStrategy: this._getPositionStrategy(),
                hasBackdrop: true,
                backdropClass: 'transparent',
                panelClass: 'mat-app-background',
                scrollStrategy: this._overlay.scrollStrategies.block()
            });
        }
        if (!this._overLayRef.hasAttached()) {
            this._portal = new _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_2__["ComponentPortal"](_input_calendar_input_calendar_component__WEBPACK_IMPORTED_MODULE_3__["InputCalendarComponent"], null, this._getPortalInjector());
            // Attach ComponentPortal to PortalHost
            this._overLayRef.attach(this._portal);
            this._overLayRef.backdropClick().subscribe(() => {
                this.closeOverlay(undefined, false);
            });
            this.open.emit();
            this.onTouched();
        }
    }
    updateChanges() {
        this._showDate();
        super.updateChanges();
    }
    closeOverlay(selected = [], fromOverLay = true, timeZone) {
        if (fromOverLay) {
            this._value = selected.sort();
        }
        if (this._overLayRef.hasAttached()) {
            this._overLayRef.detach();
        }
        if (timeZone) {
            this._timeZone = timeZone;
        }
        this.updateChanges();
        this._showDate();
        this.close.emit();
    }
    _getPortalInjector() {
        const injectorTokens = new WeakMap();
        injectorTokens.set(_input_calendar_date_input_injection_token__WEBPACK_IMPORTED_MODULE_4__["DATE_INPUT_CALENDAR_DATA"], {
            value: this._value,
            multiSelect: this._multiSelect,
            getTime: this._getTime,
            minDate: this._minDate,
            maxDate: this._maxDate,
            minTime: this._minTime,
            maxTime: this._maxTime,
            simpleFilter: this._simpleFilter,
            timeZone: this._timeZone,
            dateClass: this._dateClass,
            customFilter: this._customFilter,
            showTimeZone: this._showTimeZone,
            selectableTimezone: this._selectableTimezone,
            startDate: this._startDate,
            setTime: this._setTime,
            parentInstance: this
        });
        return new _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_2__["PortalInjector"](this._injector, injectorTokens);
    }
    _getPositionStrategy() {
        if (this.handyNgLayoutService.isDesktop) {
            return this._overlay.position()
                .flexibleConnectedTo(this._inputFieldElm)
                .withPositions([{
                    originX: 'end',
                    originY: 'bottom',
                    overlayX: 'end',
                    overlayY: 'top',
                }, {
                    originX: 'end',
                    originY: 'top',
                    overlayX: 'end',
                    overlayY: 'bottom',
                }]);
        }
        return this._overlay.position().global().centerHorizontally().centerVertically();
    }
    _getScrollStrategy() {
        if (this.handyNgLayoutService.isDesktop) {
            return this._overlay.scrollStrategies.block();
        }
        return this._overlay.scrollStrategies.noop();
    }
    _showDate() {
        if (!this._value || this._value.length === 0) {
            this._displayVal = null;
            return;
        }
        if (Array.isArray(this._value)) {
            let datesLen = this._value.length;
            if (datesLen > 1) {
                this._displayVal = `${datesLen} dates selected`;
                return;
            }
            this._displayVal = this._datePipe.transform(this._value[0], this._timeZone, this._getTime);
            return;
        }
        this._displayVal = this._datePipe.transform(this._value, this._timeZone, this._getTime);
        return;
    }
    preModelEmitHook() {
        if (!this._value) {
            return null;
        }
        if (Array.isArray(this._value)) {
            let hasValues = this._value.length > 0;
            if (!hasValues) {
                return null;
            }
            if (!this._multiSelect) {
                return this._value[0];
            }
            return this._value;
        }
        return (this._multiSelect) ? [this._value] : this._value;
    }
    ngOnInit() {
        super.ngOnInit();
    }
    ngOnDestroy() {
        super.ngOnDestroy();
    }
}
HandyDateInputComponent.ɵfac = function HandyDateInputComponent_Factory(t) { return new (t || HandyDateInputComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_7__["NgControl"], 10), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_handy_ng_services__WEBPACK_IMPORTED_MODULE_8__["HandyNgUserService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_handy_form_handy_form_component__WEBPACK_IMPORTED_MODULE_9__["HandyFormComponent"], 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_handy_ng_services__WEBPACK_IMPORTED_MODULE_8__["HandyNgLayoutService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injector"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_10__["Overlay"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_handy_ng_pipes_handy_date_pipe__WEBPACK_IMPORTED_MODULE_6__["HandyDatePipe"])); };
HandyDateInputComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: HandyDateInputComponent, selectors: [["handy-date-input"]], viewQuery: function HandyDateInputComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstaticViewQuery"](_c0, true, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]);
    } if (rf & 2) {
        var _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._inputFieldElm = _t.first);
    } }, inputs: { appearance: "appearance", label: "label", placeholder: "placeholder", disabled: "disabled", prefixText: "prefixText", sufixText: "sufixText", prefixIcon: "prefixIcon", sufixIcon: "sufixIcon", debounceTime: "debounceTime", startHint: "startHint", endHint: "endHint", fieldName: "fieldName", pinningValue: "pinningValue", disableFieldPin: "disableFieldPin", disableFieldStateMemory: "disableFieldStateMemory", showTimeZone: "showTimeZone", selectableTimezone: "selectableTimezone", getTime: "getTime", multiSelect: "multiSelect", minDate: "minDate", maxDate: "maxDate", startDate: "startDate", minTime: "minTime", maxTime: "maxTime", simpleFilter: "simpleFilter", timeZone: "timeZone", customFilter: "customFilter", dateClass: "dateClass", setTime: "setTime" }, outputs: { valueChange: "valueChange", statusChange: "statusChange", prefixClick: "prefixClick", sufixClick: "sufixClick", open: "open", close: "close" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([
            _handy_ng_pipes_handy_date_pipe__WEBPACK_IMPORTED_MODULE_6__["HandyDatePipe"],
        ]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]], decls: 13, vars: 15, consts: [[3, "appearance"], [4, "ngIf"], ["matInput", "", "type", "text", "autocomplete", "off", 3, "readonly", "disabled", "ngModel", "placeholder", "keydown", "focus", "ngModelChange"], ["inputField", "ngModel"], ["matPrefix", "", 3, "size", "icon", "click", 4, "ngIf"], ["matSuffix", "", 3, "size", "icon", "click", 4, "ngIf"], ["mat-icon-button", "", "matSuffix", "", 3, "click", 4, "ngIf"], ["matPrefix", "", 3, "click", 4, "ngIf"], ["matSuffix", "", 3, "click", 4, "ngIf"], ["matSuffix", "", "color", "primary", "mode", "indeterminate", 3, "diameter", 4, "ngIf"], ["align", "start", 4, "ngIf"], ["align", "end", 4, "ngIf"], [3, "matTooltip", 4, "ngIf"], ["matPrefix", "", 3, "size", "icon", "click"], ["matSuffix", "", 3, "size", "icon", "click"], ["mat-icon-button", "", "matSuffix", "", 3, "click"], [3, "size", "icon"], ["matPrefix", "", 3, "click"], ["matSuffix", "", 3, "click"], ["matSuffix", "", "color", "primary", "mode", "indeterminate", 3, "diameter"], ["align", "start"], ["align", "end"], [3, "matTooltip"]], template: function HandyDateInputComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-form-field", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, HandyDateInputComponent_mat_label_1_Template, 2, 1, "mat-label", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "input", 2, 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("keydown", function HandyDateInputComponent_Template_input_keydown_2_listener($event) { return ctx.preventKeyInput($event); })("focus", function HandyDateInputComponent_Template_input_focus_2_listener($event) { return ctx.onFocus($event); })("ngModelChange", function HandyDateInputComponent_Template_input_ngModelChange_2_listener($event) { return ctx._displayVal = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, HandyDateInputComponent_handy_icon_4_Template, 1, 2, "handy-icon", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, HandyDateInputComponent_handy_icon_5_Template, 1, 2, "handy-icon", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, HandyDateInputComponent_button_6_Template, 2, 2, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, HandyDateInputComponent_span_7_Template, 2, 1, "span", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](8, HandyDateInputComponent_span_8_Template, 2, 1, "span", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, HandyDateInputComponent_mat_progress_spinner_9_Template, 1, 1, "mat-progress-spinner", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](10, HandyDateInputComponent_mat_hint_10_Template, 2, 1, "mat-hint", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, HandyDateInputComponent_mat_hint_11_Template, 2, 1, "mat-hint", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](12, HandyDateInputComponent_mat_error_12_Template, 3, 4, "mat-error", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("appearance", ctx._appearance);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._label);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("readonly", ctx.handyNgLayoutService.isMobile)("disabled", ctx._isDisabled)("ngModel", ctx._displayVal)("placeholder", ctx._placeholder);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._prefixIcon && ctx._fieldStatus !== "PENDING" && !ctx._pinningState);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._sufixIcon && ctx._fieldStatus !== "PENDING" && !ctx._pinningState);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._handyNgUserService.loggedInStatus && ctx._pinningState && !ctx._disableFieldPin);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._prefixText && ctx._fieldStatus !== "PENDING" && !ctx._pinningState);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._sufixText && ctx._fieldStatus !== "PENDING" && !ctx._pinningState);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._fieldStatus === "PENDING" && !ctx._pinningState);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._startHint);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._endHint);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._fieldErr);
    } }, directives: [_angular_material_form_field__WEBPACK_IMPORTED_MODULE_11__["MatFormField"], _angular_common__WEBPACK_IMPORTED_MODULE_12__["NgIf"], _angular_material_input__WEBPACK_IMPORTED_MODULE_13__["MatInput"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__["NgModel"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_11__["MatLabel"], _modules_shared_components_handy_icon_handy_icon_component__WEBPACK_IMPORTED_MODULE_14__["HandyIconComponent"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_11__["MatPrefix"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_11__["MatSuffix"], _angular_material_button__WEBPACK_IMPORTED_MODULE_15__["MatButton"], _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_16__["MatProgressSpinner"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_11__["MatHint"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_11__["MatError"], _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_17__["MatTooltip"]], pipes: [_handy_ng_pipes_truncate_pipe__WEBPACK_IMPORTED_MODULE_18__["TruncatePipe"]], styles: ["[_nghost-%COMP%] {\n  display: block;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvaGFuZHkvbW9kdWxlcy9oYW5keS1mb3JtL2NvbXBvbmVudHMvaGFuZHktZGF0ZS1pbnB1dC9oYW5keS1kYXRlLWlucHV0LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFDO0VBQ0UsY0FBQTtBQUNIIiwiZmlsZSI6InNyYy9hcHAvaGFuZHkvbW9kdWxlcy9oYW5keS1mb3JtL2NvbXBvbmVudHMvaGFuZHktZGF0ZS1pbnB1dC9oYW5keS1kYXRlLWlucHV0LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiIDpob3N0IHtcclxuICAgZGlzcGxheTogYmxvY2s7XHJcbiB9Il19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](HandyDateInputComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'handy-date-input',
                templateUrl: './handy-date-input.component.html',
                styleUrls: ['./handy-date-input.component.scss'],
                inputs: [
                    'appearance', 'label', 'placeholder', 'disabled',
                    'prefixText', 'sufixText', 'prefixIcon',
                    'sufixIcon',
                    'debounceTime', 'startHint', 'endHint', 'fieldName',
                    'pinningValue', 'disableFieldPin', 'disableFieldStateMemory',
                    'showTimeZone', 'selectableTimezone', 'getTime', 'multiSelect',
                    'minDate', 'maxDate', 'startDate', 'minTime', 'maxTime',
                    'simpleFilter', 'timeZone', 'customFilter', 'dateClass', 'setTime'
                ],
                outputs: [
                    'valueChange', 'statusChange', 'prefixClick', 'sufixClick'
                ],
                providers: [
                    _handy_ng_pipes_handy_date_pipe__WEBPACK_IMPORTED_MODULE_6__["HandyDatePipe"],
                ]
            }]
    }], function () { return [{ type: _angular_forms__WEBPACK_IMPORTED_MODULE_7__["NgControl"], decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
            }, {
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Self"]
            }] }, { type: _handy_ng_services__WEBPACK_IMPORTED_MODULE_8__["HandyNgUserService"] }, { type: _handy_form_handy_form_component__WEBPACK_IMPORTED_MODULE_9__["HandyFormComponent"], decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
            }] }, { type: _handy_ng_services__WEBPACK_IMPORTED_MODULE_8__["HandyNgLayoutService"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injector"] }, { type: _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_10__["Overlay"] }, { type: _handy_ng_pipes_handy_date_pipe__WEBPACK_IMPORTED_MODULE_6__["HandyDatePipe"] }]; }, { _inputFieldElm: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: ['inputField', { static: true, read: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"] }]
        }], showTimeZone: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], selectableTimezone: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], getTime: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], multiSelect: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], minDate: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], maxDate: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], startDate: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], setTime: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], minTime: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], maxTime: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], simpleFilter: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], timeZone: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], customFilter: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], dateClass: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], open: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"],
            args: ['open']
        }], close: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"],
            args: ['close']
        }] }); })();


/***/ }),

/***/ "./src/app/handy/modules/handy-form/components/handy-date-input/input-calendar/date-input-injection-token.ts":
/*!*******************************************************************************************************************!*\
  !*** ./src/app/handy/modules/handy-form/components/handy-date-input/input-calendar/date-input-injection-token.ts ***!
  \*******************************************************************************************************************/
/*! exports provided: DATE_INPUT_CALENDAR_DATA */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DATE_INPUT_CALENDAR_DATA", function() { return DATE_INPUT_CALENDAR_DATA; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");

const DATE_INPUT_CALENDAR_DATA = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["InjectionToken"]('DATE_INPUT_CALENDAR_DATA');


/***/ }),

/***/ "./src/app/handy/modules/handy-form/components/handy-date-input/input-calendar/handy-date-input-date-adapter.ts":
/*!**********************************************************************************************************************!*\
  !*** ./src/app/handy/modules/handy-form/components/handy-date-input/input-calendar/handy-date-input-date-adapter.ts ***!
  \**********************************************************************************************************************/
/*! exports provided: HandyDateInputAdapter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HandyDateInputAdapter", function() { return HandyDateInputAdapter; });
/* harmony import */ var _angular_material_moment_adapter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/material-moment-adapter */ "./node_modules/@angular/material-moment-adapter/fesm2015/material-moment-adapter.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");



class HandyDateInputAdapter extends _angular_material_moment_adapter__WEBPACK_IMPORTED_MODULE_0__["MomentDateAdapter"] {
    getFirstDayOfWeek() {
        return 1;
    }
}
HandyDateInputAdapter.ɵfac = function HandyDateInputAdapter_Factory(t) { return ɵHandyDateInputAdapter_BaseFactory(t || HandyDateInputAdapter); };
HandyDateInputAdapter.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: HandyDateInputAdapter, factory: HandyDateInputAdapter.ɵfac, providedIn: 'root' });
const ɵHandyDateInputAdapter_BaseFactory = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetInheritedFactory"](HandyDateInputAdapter);
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](HandyDateInputAdapter, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"],
        args: [{ providedIn: 'root' }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/handy/modules/handy-form/components/handy-date-input/input-calendar/input-calendar.component.ts":
/*!*****************************************************************************************************************!*\
  !*** ./src/app/handy/modules/handy-form/components/handy-date-input/input-calendar/input-calendar.component.ts ***!
  \*****************************************************************************************************************/
/*! exports provided: InputCalendarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InputCalendarComponent", function() { return InputCalendarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _date_input_injection_token__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./date-input-injection-token */ "./src/app/handy/modules/handy-form/components/handy-date-input/input-calendar/date-input-injection-token.ts");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/core */ "./node_modules/@angular/material/fesm2015/core.js");
/* harmony import */ var _handy_date_input_date_adapter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./handy-date-input-date-adapter */ "./src/app/handy/modules/handy-form/components/handy-date-input/input-calendar/handy-date-input-date-adapter.ts");
/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! moment-timezone */ "./node_modules/moment-timezone/index.js");
/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(moment_timezone__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/datepicker */ "./node_modules/@angular/material/fesm2015/datepicker.js");
/* harmony import */ var _handy_select_input_handy_select_input_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../handy-select-input/handy-select-input.component */ "./src/app/handy/modules/handy-form/components/handy-select-input/handy-select-input.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _handy_time_input_handy_time_input_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../handy-time-input/handy-time-input.component */ "./src/app/handy/modules/handy-form/components/handy-time-input/handy-time-input.component.ts");
/* harmony import */ var _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/flex-layout/flex */ "./node_modules/@angular/flex-layout/esm2015/flex.js");
/* harmony import */ var _modules_shared_components_buttons_stroked_btn_stroked_btn_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../../../modules/shared/components/buttons/stroked-btn/stroked-btn.component */ "./src/app/modules/shared/components/buttons/stroked-btn/stroked-btn.component.ts");
/* harmony import */ var _modules_shared_components_buttons_raised_btn_raised_btn_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../../../modules/shared/components/buttons/raised-btn/raised-btn.component */ "./src/app/modules/shared/components/buttons/raised-btn/raised-btn.component.ts");
/* harmony import */ var _handy_ng_pipes_handy_timezone_pipe__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @handy-ng/pipes/handy-timezone.pipe */ "./src/app/handy/pipes/handy-timezone.pipe.ts");
















const _c0 = ["calendar"];
function InputCalendarComponent_p_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "handyTimezone");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](2, 1, ctx_r0.timeZone));
} }
function InputCalendarComponent_handy_select_input_7_Template(rf, ctx) { if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "handy-select-input", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function InputCalendarComponent_handy_select_input_7_Template_handy_select_input_ngModelChange_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r6); const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r5.timeZone = $event; })("valueChange", function InputCalendarComponent_handy_select_input_7_Template_handy_select_input_valueChange_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r6); const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r7.changeTimeZone($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx_r2.timeZone)("hasEmptyOption", false)("options", ctx_r2.timeZonesList);
} }
function InputCalendarComponent_div_8_Template(rf, ctx) { if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "handy-time-input", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function InputCalendarComponent_div_8_Template_handy_time_input_ngModelChange_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r9); const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r8.time = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("min", ctx_r3.minTime)("max", ctx_r3.maxTime)("ngModel", ctx_r3.time);
} }
function InputCalendarComponent_div_9_Template(rf, ctx) { if (rf & 1) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "stroked-btn", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function InputCalendarComponent_div_9_Template_stroked_btn_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r11); const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r10.resetClick(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Reset");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "raised-btn", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function InputCalendarComponent_div_9_Template_raised_btn_click_3_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r11); const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r12.confirmClick(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Confirm");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
class InputCalendarComponent {
    constructor(initialData) {
        this.initialData = initialData;
        this.selectedDate = [];
        this.minDate = null;
        this.maxDate = null;
        this.time = 0;
        this.getTime = false;
        this.minTime = null;
        this.maxTime = null;
        this._simpleFilterOpts = [];
        this._finalSimpleFilterDays = [];
        this._singleSelectedClass = 'calendar-single-select mat-calendar-body-selected';
        this.timeZonesList = [];
        this.continetsList = ['Europe', 'America', 'Africa', 'Asia'];
        this._hasSetTime = false;
        this.dateFilter = (date) => {
            return true;
        };
        let { value = null, getTime = false, minTime = null, maxTime = null, minDate = null, maxDate = null, simpleFilter = [], customFilter = null, dateClass = null, timeZone = moment_timezone__WEBPACK_IMPORTED_MODULE_4__["tz"].guess(true), multiSelect = true, showTimeZone = false, selectableTimezone = false, startDate = null, setTime = null, parentInstance } = this.initialData;
        this.minTime = minTime;
        this.maxTime = maxTime;
        if (setTime) {
            let splittedSet = setTime.split(':');
            let hr = parseInt(splittedSet[0]);
            let min = parseInt(splittedSet[1]);
            this.time = (hr * 3600) + (min * 60);
            this._hasSetTime = true;
        }
        this.parentInstance = parentInstance;
        this.timeZone = timeZone;
        this.getTime = (!multiSelect) ? getTime : false;
        this.multiSelect = multiSelect;
        this.showTimeZone = showTimeZone;
        this.selectableTimezone = selectableTimezone;
        this._parseTimezonesList();
        if (minDate) {
            switch (typeof minDate) {
                case 'number':
                    this.minDate = moment_timezone__WEBPACK_IMPORTED_MODULE_4__["tz"](minDate, this.timeZone);
                    break;
                case 'string':
                    this.minDate = moment_timezone__WEBPACK_IMPORTED_MODULE_4__["tz"](minDate, 'DD MMM YYYY', this.timeZone);
                    break;
                default:
                    this.minDate = minDate;
                    break;
            }
        }
        if (maxDate) {
            switch (typeof maxDate) {
                case 'number':
                    this.maxDate = moment_timezone__WEBPACK_IMPORTED_MODULE_4__["tz"](maxDate, this.timeZone);
                    break;
                case 'string':
                    this.maxDate = moment_timezone__WEBPACK_IMPORTED_MODULE_4__["tz"](maxDate, 'DD MMM YYYY', this.timeZone);
                    break;
                default:
                    this.maxDate = maxDate;
                    break;
            }
        }
        if (startDate) {
            switch (typeof startDate) {
                case 'number':
                    this.startingDate = moment_timezone__WEBPACK_IMPORTED_MODULE_4__["tz"](startDate, this.timeZone);
                    break;
                case 'string':
                    this.startingDate = moment_timezone__WEBPACK_IMPORTED_MODULE_4__["tz"](startDate, 'DD MMM YYYY', this.timeZone);
                    break;
                default:
                    this.startingDate = startDate;
                    break;
            }
        }
        if (value) {
            if (Array.isArray(value)) {
                let valsLen = value.length;
                let firstDate = moment_timezone__WEBPACK_IMPORTED_MODULE_4__["tz"](value[0], this.timeZone);
                this.time = (firstDate.hours() * 3600) + (firstDate.minutes() * 60);
                for (let i = 0; i < valsLen; i++) {
                    const singleValDate = moment_timezone__WEBPACK_IMPORTED_MODULE_4__["tz"](value[i], this.timeZone);
                    this.selectedDate.push(this.getStringFormatedDate(singleValDate));
                    if (!this.startingDate) {
                        this.startingDate = singleValDate;
                    }
                }
            }
            else {
                let valDate = moment_timezone__WEBPACK_IMPORTED_MODULE_4__["tz"](value, this.timeZone);
                this.time = (valDate.hours() * 3600) + (valDate.minutes() * 60);
                let stringDateVal = this.getStringFormatedDate(valDate);
                if (!this.startingDate) {
                    this.startingDate = valDate;
                }
                this.selectedDate = [stringDateVal];
            }
        }
        this._simpleFilterOpts = simpleFilter;
        this._customFilter = customFilter;
        this._parseFilter();
        this._customDateClass = dateClass;
        this._parseClasses();
    }
    _parseTimezonesList() {
        if (!this.selectableTimezone) {
            return;
        }
        let zones = moment_timezone__WEBPACK_IMPORTED_MODULE_4__["tz"].names();
        let zonesLen = zones.length;
        let groups = {};
        let continentsLen = this.continetsList.length;
        for (let i = 0; i < continentsLen; i++) {
            const singleContinent = this.continetsList[i];
            groups[singleContinent] = {
                label: singleContinent,
                options: []
            };
        }
        for (let i = 0; i < zonesLen; i++) {
            const singleZone = zones[i];
            let splitted = singleZone.split('/');
            if (splitted.length < 2) {
                continue;
            }
            if (!this.continetsList.includes(splitted[0])) {
                continue;
            }
            groups[splitted[0]].options.push({
                value: singleZone,
                displayValue: splitted[1].split('_').join(' ')
            });
        }
        for (let i = 0; i < continentsLen; i++) {
            const singleContinent = this.continetsList[i];
            groups[singleContinent].options = groups[singleContinent].options.sort();
            this.timeZonesList.push(groups[singleContinent]);
        }
    }
    selectedChange(date) {
        let formattedDate = this.getStringFormatedDate(date);
        if (!this.multiSelect && !this.getTime) {
            this.selectedDate = [formattedDate];
            this.calendar.updateTodaysDate();
            this.closePicker();
            return;
        }
        if (this.multiSelect) {
            if (this.selectedDate.includes(formattedDate)) {
                this.selectedDate = this.selectedDate.filter(selectedDate => { return selectedDate !== formattedDate; });
            }
            else {
                this.selectedDate.push(formattedDate);
            }
        }
        else {
            this.selectedDate = [formattedDate];
        }
        this.calendar.updateTodaysDate();
        return;
    }
    getStringFormatedDate(date) {
        return date.format('DD MMM YYYY');
    }
    _parseFilter() {
        if (typeof this._customFilter === 'function') {
            this.dateFilter = (date) => {
                return this._customFilter(this.getStringFormatedDate(date));
            };
            return;
        }
        let simpleFilerOptsLen = this._simpleFilterOpts.length;
        if (simpleFilerOptsLen > 0) {
            for (let i = 0; i < simpleFilerOptsLen; i++) {
                let singleOption = this._simpleFilterOpts[i];
                switch (singleOption) {
                    case 'mon-fri':
                        this._finalSimpleFilterDays.push(1, 2, 3, 4, 5);
                        break;
                    case 'weekend':
                        this._finalSimpleFilterDays.push(0, 6);
                        break;
                    case 'mon':
                        this._finalSimpleFilterDays.push(1);
                        break;
                    case 'tue':
                        this._finalSimpleFilterDays.push(2);
                        break;
                    case 'wed':
                        this._finalSimpleFilterDays.push(3);
                        break;
                    case 'thu':
                        this._finalSimpleFilterDays.push(4);
                        break;
                    case 'fri':
                        this._finalSimpleFilterDays.push(5);
                        break;
                    case 'sat':
                        this._finalSimpleFilterDays.push(6);
                        break;
                    case 'sun':
                        this._finalSimpleFilterDays.push(0);
                        break;
                    default:
                        break;
                }
            }
            this.dateFilter = (date) => {
                return this._finalSimpleFilterDays.includes(date.day());
            };
        }
    }
    _parseClasses() {
        this.dateClass = (date) => {
            let result = '';
            let dateString = this.getStringFormatedDate(date);
            if (typeof this._customDateClass === 'function') {
                result += ` ${this._customDateClass(dateString)}`;
            }
            result += ` ${this._selectClass(dateString)}`;
            return result;
        };
    }
    dateClass(date) {
        return '';
    }
    _selectClass(date) {
        // ? no date selected
        if (!this.selectedDate) {
            return '';
        }
        return (this.selectedDate.includes(date)) ? this._singleSelectedClass : '';
    }
    confirmClick() {
        this.closePicker();
    }
    closePicker() {
        if (this._hasSetTime || (this.getTime && typeof this.time === 'number' && this.selectedDate[0])) {
            const formattedTime = moment_timezone__WEBPACK_IMPORTED_MODULE_4__["utc"](this.time * 1000).format('H:mm');
            let date = moment_timezone__WEBPACK_IMPORTED_MODULE_4__["tz"](this.selectedDate[0] + ' ' + formattedTime, 'DD MMM YYYY H:mm', this.timeZone);
            this.parentInstance.closeOverlay([date.valueOf()], true, this.timeZone);
            return;
        }
        let finalDates = [];
        let selectedDatesLen = this.selectedDate.length;
        for (let i = 0; i < selectedDatesLen; i++) {
            const singleDateString = this.selectedDate[i];
            finalDates.push(moment_timezone__WEBPACK_IMPORTED_MODULE_4__["tz"](singleDateString, 'DD MMM YYYY', this.timeZone).valueOf());
        }
        this.parentInstance.closeOverlay(finalDates, true, this.timeZone);
        return;
    }
    resetClick() {
        this.selectedDate = [];
        this.time = 0;
        this.calendar.updateTodaysDate();
    }
    changeTimeZone(timeZone) {
        this.timeZone = timeZone;
    }
}
InputCalendarComponent.ɵfac = function InputCalendarComponent_Factory(t) { return new (t || InputCalendarComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_date_input_injection_token__WEBPACK_IMPORTED_MODULE_1__["DATE_INPUT_CALENDAR_DATA"])); };
InputCalendarComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: InputCalendarComponent, selectors: [["app-input-calendar"]], viewQuery: function InputCalendarComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstaticViewQuery"](_c0, true);
    } if (rf & 2) {
        var _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.calendar = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([
            { provide: _angular_material_core__WEBPACK_IMPORTED_MODULE_2__["DateAdapter"], useClass: _handy_date_input_date_adapter__WEBPACK_IMPORTED_MODULE_3__["HandyDateInputAdapter"] },
        ])], decls: 10, vars: 9, consts: [[1, "date-overlay-wrapper", "mat-elevation-z8"], [1, "date-calendar-handy"], [4, "ngIf"], [1, "datepicker-input-calendar", 3, "startAt", "minDate", "maxDate", "dateFilter", "dateClass", "selectedChange"], ["calendar", ""], [1, "time-zone"], [1, "time-zone-data-picker"], [3, "ngModel", "hasEmptyOption", "options", "ngModelChange", "valueChange", 4, "ngIf"], ["class", "time time-data-picker", 4, "ngIf"], ["class", "confirm-btn", "fxLayout", "row", "fxLayoutAlign", "space-between flex-end", 4, "ngIf"], [3, "ngModel", "hasEmptyOption", "options", "ngModelChange", "valueChange"], [1, "time", "time-data-picker"], ["valueType", "seconds", 3, "min", "max", "ngModel", "ngModelChange"], ["fxLayout", "row", "fxLayoutAlign", "space-between flex-end", 1, "confirm-btn"], ["color", "warn", "icon", "refresh", 3, "click"], ["color", "primary", "icon", "check", 3, "click"]], template: function InputCalendarComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, InputCalendarComponent_p_2_Template, 3, 3, "p", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "mat-calendar", 3, 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("selectedChange", function InputCalendarComponent_Template_mat_calendar_selectedChange_3_listener($event) { return ctx.selectedChange($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, InputCalendarComponent_handy_select_input_7_Template, 1, 3, "handy-select-input", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](8, InputCalendarComponent_div_8_Template, 2, 3, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, InputCalendarComponent_div_9_Template, 5, 0, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.showTimeZone);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("startAt", ctx.startingDate)("minDate", ctx.minDate)("maxDate", ctx.maxDate)("dateFilter", ctx.dateFilter)("dateClass", ctx.dateClass);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.selectableTimezone);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.getTime);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.getTime || ctx.multiSelect);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_5__["NgIf"], _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_6__["MatCalendar"], _handy_select_input_handy_select_input_component__WEBPACK_IMPORTED_MODULE_7__["HandySelectInputComponent"], _angular_forms__WEBPACK_IMPORTED_MODULE_8__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_8__["NgModel"], _handy_time_input_handy_time_input_component__WEBPACK_IMPORTED_MODULE_9__["HandyTimeInputComponent"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_10__["DefaultLayoutDirective"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_10__["DefaultLayoutAlignDirective"], _modules_shared_components_buttons_stroked_btn_stroked_btn_component__WEBPACK_IMPORTED_MODULE_11__["StrokedBtnComponent"], _modules_shared_components_buttons_raised_btn_raised_btn_component__WEBPACK_IMPORTED_MODULE_12__["RaisedBtnComponent"]], pipes: [_handy_ng_pipes_handy_timezone_pipe__WEBPACK_IMPORTED_MODULE_13__["HandyTimeZonePipe"]], styles: [".date-overlay-wrapper[_ngcontent-%COMP%] {\n  width: 300px;\n  padding: 0.1rem 0 0.5rem;\n}\n\n.datepicker-input-calendar[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\n.confirm-btn[_ngcontent-%COMP%] {\n  padding-bottom: 0.2rem;\n  padding-left: 1rem;\n  padding-right: 1rem;\n}\n\nbutton[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n  line-height: 20px;\n}\n\n.date-calendar-handy[_ngcontent-%COMP%] {\n  position: relative;\n  padding-bottom: 1rem;\n}\n\n.date-calendar-handy[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0.65rem;\n  left: 95px;\n  min-width: 130px;\n  text-align: center;\n  transition: 250ms;\n}\n\n.time-zone[_ngcontent-%COMP%] {\n  padding: 0 1rem;\n  padding-bottom: 0.2rem;\n}\n\n.time-zone-data-picker[_ngcontent-%COMP%] {\n  margin-top: -0.5rem;\n}\n\n.time-data-picker[_ngcontent-%COMP%] {\n  margin-top: -0.5rem;\n  margin-bottom: 0.4rem;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvaGFuZHkvbW9kdWxlcy9oYW5keS1mb3JtL2NvbXBvbmVudHMvaGFuZHktZGF0ZS1pbnB1dC9pbnB1dC1jYWxlbmRhci9pbnB1dC1jYWxlbmRhci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFlBQUE7RUFDQSx3QkFBQTtBQUNGOztBQUVBO0VBQ0UsV0FBQTtBQUNGOztBQUVBO0VBRUUsc0JBQUE7RUFDQSxrQkFBQTtFQUNBLG1CQUFBO0FBQUY7O0FBSUU7RUFDRSxlQUFBO0VBQ0EsaUJBQUE7QUFESjs7QUFNQTtFQUNFLGtCQUFBO0VBQ0Esb0JBQUE7QUFIRjs7QUFLRTtFQUNFLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLFVBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0EsaUJBQUE7QUFISjs7QUFRQTtFQUNFLGVBQUE7RUFDQSxzQkFBQTtBQUxGOztBQVFBO0VBQ0UsbUJBQUE7QUFMRjs7QUFRQTtFQUNFLG1CQUFBO0VBQ0EscUJBQUE7QUFMRiIsImZpbGUiOiJzcmMvYXBwL2hhbmR5L21vZHVsZXMvaGFuZHktZm9ybS9jb21wb25lbnRzL2hhbmR5LWRhdGUtaW5wdXQvaW5wdXQtY2FsZW5kYXIvaW5wdXQtY2FsZW5kYXIuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuZGF0ZS1vdmVybGF5LXdyYXBwZXIge1xyXG4gIHdpZHRoOiAzMDBweDtcclxuICBwYWRkaW5nOiAuMXJlbSAwIC41cmVtO1xyXG59XHJcblxyXG4uZGF0ZXBpY2tlci1pbnB1dC1jYWxlbmRhciB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbn1cclxuXHJcbi5jb25maXJtLWJ0biB7XHJcbiAgLy8gcGFkZGluZy10b3A6IDFyZW07XHJcbiAgcGFkZGluZy1ib3R0b206IC4ycmVtO1xyXG4gIHBhZGRpbmctbGVmdDogMXJlbTtcclxuICBwYWRkaW5nLXJpZ2h0OiAxcmVtO1xyXG59XHJcblxyXG5idXR0b24ge1xyXG4gIG1hdC1pY29uIHtcclxuICAgIGZvbnQtc2l6ZTogMTZweDtcclxuICAgIGxpbmUtaGVpZ2h0OiAyMHB4O1xyXG4gIH1cclxufVxyXG5cclxuXHJcbi5kYXRlLWNhbGVuZGFyLWhhbmR5IHtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgcGFkZGluZy1ib3R0b206IDFyZW07XHJcblxyXG4gICY+cCB7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICB0b3A6IDAuNjVyZW07XHJcbiAgICBsZWZ0OiA5NXB4O1xyXG4gICAgbWluLXdpZHRoOiAxMzBweDtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIHRyYW5zaXRpb246IDI1MG1zO1xyXG4gIH1cclxuXHJcbn1cclxuXHJcbi50aW1lLXpvbmUge1xyXG4gIHBhZGRpbmc6IDAgMXJlbTtcclxuICBwYWRkaW5nLWJvdHRvbTogLjJyZW07XHJcbn1cclxuXHJcbi50aW1lLXpvbmUtZGF0YS1waWNrZXIge1xyXG4gIG1hcmdpbi10b3A6IC0uNXJlbTtcclxufVxyXG5cclxuLnRpbWUtZGF0YS1waWNrZXIge1xyXG4gIG1hcmdpbi10b3A6IC0uNXJlbTtcclxuICBtYXJnaW4tYm90dG9tOiAuNHJlbTtcclxufSJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](InputCalendarComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-input-calendar',
                templateUrl: './input-calendar.component.html',
                styleUrls: ['./input-calendar.component.scss'],
                providers: [
                    { provide: _angular_material_core__WEBPACK_IMPORTED_MODULE_2__["DateAdapter"], useClass: _handy_date_input_date_adapter__WEBPACK_IMPORTED_MODULE_3__["HandyDateInputAdapter"] },
                ]
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [_date_input_injection_token__WEBPACK_IMPORTED_MODULE_1__["DATE_INPUT_CALENDAR_DATA"]]
            }] }]; }, { calendar: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: ['calendar', { static: true }]
        }] }); })();


/***/ }),

/***/ "./src/app/handy/modules/handy-form/components/handy-date-range-input/handy-date-range-input.component.ts":
/*!****************************************************************************************************************!*\
  !*** ./src/app/handy/modules/handy-form/components/handy-date-range-input/handy-date-range-input.component.ts ***!
  \****************************************************************************************************************/
/*! exports provided: HandyDateRangeInputComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HandyDateRangeInputComponent", function() { return HandyDateRangeInputComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _handy_ng_extenders_handy_form_contol__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @handy-ng/extenders/handy-form-contol */ "./src/app/handy/extenders/handy-form-contol.ts");
/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! moment-timezone */ "./node_modules/moment-timezone/index.js");
/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(moment_timezone__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _handy_date_input_handy_date_input_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../handy-date-input/handy-date-input.component */ "./src/app/handy/modules/handy-form/components/handy-date-input/handy-date-input.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _handy_ng_services__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @handy-ng/services */ "./src/app/handy/services/index.ts");
/* harmony import */ var _handy_form_handy_form_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../handy-form/handy-form.component */ "./src/app/handy/modules/handy-form/components/handy-form/handy-form.component.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/form-field */ "./node_modules/@angular/material/fesm2015/form-field.js");
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/progress-spinner */ "./node_modules/@angular/material/fesm2015/progress-spinner.js");
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/tooltip */ "./node_modules/@angular/material/fesm2015/tooltip.js");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/fesm2015/button.js");
/* harmony import */ var _modules_shared_components_handy_icon_handy_icon_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../../modules/shared/components/handy-icon/handy-icon.component */ "./src/app/modules/shared/components/handy-icon/handy-icon.component.ts");
/* harmony import */ var _handy_ng_pipes_truncate_pipe__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @handy-ng/pipes/truncate.pipe */ "./src/app/handy/pipes/truncate.pipe.ts");
















const _c0 = ["fromInput"];
const _c1 = ["toInput"];
function HandyDateRangeInputComponent_mat_label_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r0._label);
} }
function HandyDateRangeInputComponent_mat_hint_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-hint", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r4._startHint);
} }
function HandyDateRangeInputComponent_mat_hint_12_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-hint", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r5._endHint);
} }
function HandyDateRangeInputComponent_mat_progress_spinner_13_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "mat-progress-spinner", 17);
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("diameter", 16);
} }
function HandyDateRangeInputComponent_mat_error_14_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-error", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "truncate");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matTooltip", ctx_r7._fieldErr);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](2, 2, ctx_r7._fieldErr));
} }
function HandyDateRangeInputComponent_button_15_Template(rf, ctx) { if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HandyDateRangeInputComponent_button_15_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r10); const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r9.handlePinClick(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "handy-icon", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("size", 16)("icon", ctx_r8._hasPinnedVal ? "lock" : "lock_open");
} }
class HandyDateRangeInputComponent extends _handy_ng_extenders_handy_form_contol__WEBPACK_IMPORTED_MODULE_1__["HandyFormControl"] {
    constructor(ngControl, _handyNgUserService, _parentFormComponent) {
        super(ngControl, _handyNgUserService, _parentFormComponent);
        this.ngControl = ngControl;
        this._handyNgUserService = _handyNgUserService;
        this._parentFormComponent = _parentFormComponent;
        this._value = null;
        this._fromLabel = 'From';
        this._toLabel = 'To';
        this._fromPlaceholder = 'From';
        this._toPlaceholder = 'To';
        this._showTimeZone = true;
        this._selectableTimezone = false;
        this._getTime = false;
        this._getFullToDay = true;
        this._hasExplicitMinFromDate = false;
        this._hasExplicitMaxFromDate = false;
        this._hasExplicitMinToDate = false;
        this._hasExplicitMaxToDate = false;
        this._simpleFromFilter = [];
        this._simpleToFilter = [];
        this._fromTimeZone = moment_timezone__WEBPACK_IMPORTED_MODULE_2__["tz"].guess();
        this._toTimeZone = moment_timezone__WEBPACK_IMPORTED_MODULE_2__["tz"].guess();
        this.from = null;
        this.to = null;
        this._dayMs = 24 * 60 * 60 * 1000;
        this.addOnFormResetHoook(() => {
            if (this._hasPinnedVal) {
                this._value = this._lastKnownPinnedVal;
                return;
            }
            this.from = null;
            this.to = null;
            this._value = null;
        });
    }
    set fromStartHint(set) {
        this._fromStartHint = set;
    }
    set toStartHint(set) {
        this._toStartHint = set;
    }
    set fromEndHint(set) {
        this._fromEndHint = set;
    }
    set toEndHint(set) {
        this._toEndHint = set;
    }
    set fromLabel(set) {
        this._fromLabel = set;
    }
    set toLabel(set) {
        this._toLabel = set;
    }
    set fromPlaceholder(set) {
        this._fromPlaceholder = set;
    }
    set toPlaceholder(set) {
        this._toPlaceholder = set;
    }
    set showTimeZone(set) {
        this._showTimeZone = set;
    }
    set selectableTimezone(set) {
        this._selectableTimezone = set;
    }
    set getTime(set) {
        this._getTime = set;
    }
    set getFullToDay(set) {
        this._getFullToDay = set;
    }
    set fromMinDate(min) {
        this._minFromDate = min;
        switch (typeof min) {
            case 'number':
                this._explicitMinFromDate = min;
                break;
            case 'string':
                this._explicitMinFromDate = moment_timezone__WEBPACK_IMPORTED_MODULE_2__["tz"](min, 'DD MMM YYYY', this._toTimeZone).valueOf();
                break;
            default:
                this._explicitMinFromDate = min.valueOf();
                break;
        }
        this._hasExplicitMinFromDate = true;
    }
    set fromMaxDate(max) {
        this._maxFromDate = max;
        switch (typeof max) {
            case 'number':
                this._explicitMaxFromDate = max;
                break;
            case 'string':
                this._explicitMaxFromDate = moment_timezone__WEBPACK_IMPORTED_MODULE_2__["tz"](max, 'DD MMM YYYY', this._toTimeZone).valueOf();
                break;
            default:
                this._explicitMaxFromDate = max.valueOf();
                break;
        }
        this._hasExplicitMaxFromDate = true;
    }
    set toMinDate(min) {
        this._minToDate = min;
        switch (typeof min) {
            case 'number':
                this._explicitMinToDate = min;
                break;
            case 'string':
                this._explicitMinToDate = moment_timezone__WEBPACK_IMPORTED_MODULE_2__["tz"](min, 'DD MMM YYYY', this._toTimeZone).valueOf();
                break;
            default:
                this._explicitMinToDate = min.valueOf();
                break;
        }
        this._hasExplicitMinToDate = true;
    }
    set toMaxDate(max) {
        this._maxToDate = max;
        switch (typeof max) {
            case 'number':
                this._explicitMaxToDate = max;
                break;
            case 'string':
                this._explicitMaxToDate = moment_timezone__WEBPACK_IMPORTED_MODULE_2__["tz"](max, 'DD MMM YYYY', this._toTimeZone).valueOf();
                break;
            default:
                this._explicitMaxToDate = max.valueOf();
                break;
        }
        this._hasExplicitMaxToDate = true;
    }
    set fromStartDate(start) {
        this._fromStartDate = start;
    }
    set toStartDate(start) {
        this._toStartDate = start;
    }
    set minDaysRange(min) {
        this._minDaysRange = min;
    }
    set maxDaysRange(max) {
        this._maxDaysRange = max;
    }
    set fromMinTime(min) {
        this._minFromTime = min;
    }
    set fromMaxTime(max) {
        this._maxFromTime = max;
    }
    set toMinTime(min) {
        this._minToTime = min;
    }
    set toMaxTime(max) {
        this._maxToTime = max;
    }
    set setToTime(set) {
        this._setToTime = set;
    }
    set setFromTime(set) {
        this._setFromTime = set;
    }
    set fromSimpleFilter(filter) {
        this._simpleFromFilter = filter;
    }
    set toSimpleFilter(filter) {
        this._simpleToFilter = filter;
    }
    set fromTimeZone(zone) {
        this._fromTimeZone = zone;
    }
    set toTimeZone(zone) {
        this._toTimeZone = zone;
    }
    set fromCustomilter(filter) {
        this._customFromFilter = filter;
    }
    set toCustomFilter(filter) {
        this._customToFilter = filter;
    }
    set fromDateClass(classFilter) {
        this._dateFromClass = classFilter;
    }
    set toDateClass(classFilter) {
        this._dateToClass = classFilter;
    }
    ngAfterViewInit() {
        this.preWriteValueHook(this._value);
    }
    ngOnInit() {
        super.ngOnInit();
    }
    _parseMinAndMaxToDate() {
        // ? min date
        if (!this.from) {
            this._minToDate = this._explicitMinToDate;
            this._maxToDate = this._explicitMaxToDate;
            return;
        }
        let minToDateToApply = this.from;
        if (this._minDaysRange) {
            minToDateToApply = minToDateToApply + (this._minDaysRange * this._dayMs);
        }
        if (this._hasExplicitMinToDate) {
            if (minToDateToApply < this._explicitMinToDate) {
                minToDateToApply = this._explicitMinToDate;
            }
        }
        this._minToDate = minToDateToApply;
        // ? max date
        let maxToDateToApply = this._explicitMaxToDate;
        if (this._maxDaysRange) {
            maxToDateToApply = this.from + (this._maxDaysRange * this._dayMs);
        }
        if (this._hasExplicitMaxToDate) {
            if (maxToDateToApply > this._explicitMaxToDate) {
                maxToDateToApply = this._explicitMaxToDate;
            }
        }
        this._maxToDate = maxToDateToApply;
        if (this.to && (this.to < minToDateToApply || this.to > maxToDateToApply)) {
            this.to = null;
        }
    }
    _parseMinAndMaxFromDate() {
        // ? max date
        if (!this.to) {
            this._minFromDate = this._explicitMinFromDate;
            this._maxFromDate = this._explicitMaxFromDate;
            return;
        }
        let maxFromDateToApply = this.to;
        if (this._minDaysRange) {
            maxFromDateToApply = maxFromDateToApply - (this._minDaysRange * this._dayMs);
        }
        if (this._hasExplicitMaxFromDate) {
            if (maxFromDateToApply > this._explicitMaxFromDate) {
                maxFromDateToApply = this._explicitMaxFromDate;
            }
        }
        this._maxFromDate = maxFromDateToApply;
        // ? min date
        let minFromDateToApply = this._explicitMinFromDate;
        if (this._maxDaysRange) {
            minFromDateToApply = this.to - (this._maxDaysRange * this._dayMs);
        }
        if (this._hasExplicitMinFromDate) {
            if (minFromDateToApply < this._explicitMinFromDate) {
                minFromDateToApply = this._explicitMinFromDate;
            }
        }
        this._minFromDate = minFromDateToApply;
        if (this.from && (this.from < minFromDateToApply || this.from > maxFromDateToApply)) {
            this.from = null;
        }
    }
    fromValueChange() {
        if (this.from && (this._value !== null && this._value !== undefined)) {
            this._value.from = this.from;
        }
        this._parseMinAndMaxToDate();
        setTimeout(() => {
            if (this.ngControl.touched && this.from && !this.to) {
                this.toInput.onFocus(null);
            }
            this.updateChanges();
        });
    }
    toValueChange() {
        if (this.to && (this._value !== null && this._value !== undefined)) {
            this._value.to = this.to;
        }
        this._parseMinAndMaxFromDate();
        setTimeout(() => {
            if (this.ngControl.touched && this.to && !this.from) {
                this.fromInput.onFocus(null);
            }
            this.updateChanges();
        });
    }
    updateChanges() {
        this.preWriteValueHook(this._value);
        super.updateChanges();
    }
    preWriteValueHook(value) {
        if (value) {
            let { to, from } = value;
            if (this.to !== to) {
                this.to = to;
            }
            if (this.from !== from) {
                this.from = from;
            }
        }
    }
    preModelEmitHook() {
        if (!this.from && !this.to) {
            return null;
        }
        let to = this.to;
        if (this._getFullToDay && to) {
            let date = moment_timezone__WEBPACK_IMPORTED_MODULE_2__["tz"](to, this._toTimeZone);
            to = date.set({ hour: 23, minute: 59, second: 59, millisecond: 999 }).valueOf();
        }
        return { from: this.from, to };
    }
    ngOnDestroy() {
        super.ngOnDestroy();
    }
}
HandyDateRangeInputComponent.ɵfac = function HandyDateRangeInputComponent_Factory(t) { return new (t || HandyDateRangeInputComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgControl"], 10), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_handy_ng_services__WEBPACK_IMPORTED_MODULE_5__["HandyNgUserService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_handy_form_handy_form_component__WEBPACK_IMPORTED_MODULE_6__["HandyFormComponent"], 8)); };
HandyDateRangeInputComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: HandyDateRangeInputComponent, selectors: [["handy-date-range-input"]], viewQuery: function HandyDateRangeInputComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, true, _handy_date_input_handy_date_input_component__WEBPACK_IMPORTED_MODULE_3__["HandyDateInputComponent"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c1, true, _handy_date_input_handy_date_input_component__WEBPACK_IMPORTED_MODULE_3__["HandyDateInputComponent"]);
    } if (rf & 2) {
        var _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.fromInput = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.toInput = _t.first);
    } }, inputs: { appearance: "appearance", disabled: "disabled", debounceTime: "debounceTime", fieldName: "fieldName", pinningValue: "pinningValue", disableFieldPin: "disableFieldPin", fromStartHint: "fromStartHint", toStartHint: "toStartHint", fromEndHint: "fromEndHint", toEndHint: "toEndHint", fromLabel: "fromLabel", toLabel: "toLabel", fromPlaceholder: "fromPlaceholder", toPlaceholder: "toPlaceholder", showTimeZone: "showTimeZone", selectableTimezone: "selectableTimezone", getTime: "getTime", getFullToDay: "getFullToDay", fromMinDate: "fromMinDate", fromMaxDate: "fromMaxDate", toMinDate: "toMinDate", toMaxDate: "toMaxDate", fromStartDate: "fromStartDate", toStartDate: "toStartDate", minDaysRange: "minDaysRange", maxDaysRange: "maxDaysRange", fromMinTime: "fromMinTime", fromMaxTime: "fromMaxTime", toMinTime: "toMinTime", toMaxTime: "toMaxTime", setToTime: "setToTime", setFromTime: "setFromTime", fromSimpleFilter: "fromSimpleFilter", toSimpleFilter: "toSimpleFilter", fromTimeZone: "fromTimeZone", toTimeZone: "toTimeZone", fromCustomilter: "fromCustomilter", toCustomFilter: "toCustomFilter", fromDateClass: "fromDateClass", toDateClass: "toDateClass" }, outputs: { valueChange: "valueChange", statusChange: "statusChange", prefixClick: "prefixClick", sufixClick: "sufixClick" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]], decls: 16, vars: 55, consts: [[1, "data-range-content"], [4, "ngIf"], [3, "disabled", "ngModel", "type", "ngModelChange"], ["inputField", "ngModel"], [1, "data-range-elements"], [1, "data-range-left"], [3, "ngModel", "disabled", "appearance", "getTime", "showTimeZone", "selectableTimezone", "label", "placeholder", "startHint", "endHint", "startDate", "minDate", "maxDate", "minTime", "maxTime", "simpleFilter", "customFilter", "dateClass", "timeZone", "setTime", "fieldName", "disableFieldPin", "disableFieldStateMemory", "ngModelChange", "valueChange", "open"], ["fromInput", ""], [1, "data-range-right"], ["toInput", ""], ["align", "start", 4, "ngIf"], ["align", "end", 4, "ngIf"], ["matSuffix", "", "color", "primary", "mode", "indeterminate", 3, "diameter", 4, "ngIf"], [3, "matTooltip", 4, "ngIf"], ["mat-icon-button", "", "matSuffix", "", 3, "click", 4, "ngIf"], ["align", "start"], ["align", "end"], ["matSuffix", "", "color", "primary", "mode", "indeterminate", 3, "diameter"], [3, "matTooltip"], ["mat-icon-button", "", "matSuffix", "", 3, "click"], [3, "size", "icon"]], template: function HandyDateRangeInputComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, HandyDateRangeInputComponent_mat_label_1_Template, 2, 1, "mat-label", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "input", 2, 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function HandyDateRangeInputComponent_Template_input_ngModelChange_2_listener($event) { return ctx._value = $event; })("ngModelChange", function HandyDateRangeInputComponent_Template_input_ngModelChange_2_listener() { return ctx.updateChanges(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "handy-date-input", 6, 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function HandyDateRangeInputComponent_Template_handy_date_input_ngModelChange_6_listener($event) { return ctx.from = $event; })("valueChange", function HandyDateRangeInputComponent_Template_handy_date_input_valueChange_6_listener() { return ctx.fromValueChange(); })("open", function HandyDateRangeInputComponent_Template_handy_date_input_open_6_listener() { return ctx.onTouched(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "handy-date-input", 6, 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function HandyDateRangeInputComponent_Template_handy_date_input_ngModelChange_9_listener($event) { return ctx.to = $event; })("valueChange", function HandyDateRangeInputComponent_Template_handy_date_input_valueChange_9_listener() { return ctx.toValueChange(); })("open", function HandyDateRangeInputComponent_Template_handy_date_input_open_9_listener() { return ctx.onTouched(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, HandyDateRangeInputComponent_mat_hint_11_Template, 2, 1, "mat-hint", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](12, HandyDateRangeInputComponent_mat_hint_12_Template, 2, 1, "mat-hint", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](13, HandyDateRangeInputComponent_mat_progress_spinner_13_Template, 1, 1, "mat-progress-spinner", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](14, HandyDateRangeInputComponent_mat_error_14_Template, 3, 4, "mat-error", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](15, HandyDateRangeInputComponent_button_15_Template, 2, 2, "button", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._label);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", ctx._isDisabled)("ngModel", ctx._value)("type", "hidden");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.from)("disabled", ctx._isDisabled)("appearance", ctx._appearance)("getTime", ctx._getTime)("showTimeZone", ctx._showTimeZone)("selectableTimezone", ctx._selectableTimezone)("label", ctx._fromLabel)("placeholder", ctx._fromPlaceholder)("startHint", ctx._fromStartHint)("endHint", ctx._fromEndHint)("startDate", ctx._fromStartDate)("minDate", ctx._minFromDate)("maxDate", ctx._maxFromDate)("minTime", ctx._minFromTime)("maxTime", ctx._maxFromTime)("simpleFilter", ctx._simpleFromFilter)("customFilter", ctx._customFromFilter)("dateClass", ctx._dateFromClass)("timeZone", ctx._fromTimeZone)("setTime", ctx._setFromTime)("fieldName", ctx.fieldName ? ctx.fieldName + "_to" : null)("disableFieldPin", true)("disableFieldStateMemory", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.to)("disabled", ctx._isDisabled)("appearance", ctx._appearance)("getTime", ctx._getTime)("showTimeZone", ctx._showTimeZone)("selectableTimezone", ctx._selectableTimezone)("label", ctx._toLabel)("placeholder", ctx._toPlaceholder)("startHint", ctx._toStartHint)("endHint", ctx._toEndHint)("startDate", ctx._toStartDate)("minDate", ctx._minToDate)("maxDate", ctx._maxToDate)("minTime", ctx._minToTime)("maxTime", ctx._maxToTime)("simpleFilter", ctx._simpleToFilter)("customFilter", ctx._customToFilter)("dateClass", ctx._dateToClass)("timeZone", ctx._toTimeZone)("setTime", ctx._setToTime)("fieldName", ctx.fieldName ? ctx.fieldName + "_from" : null)("disableFieldPin", true)("disableFieldStateMemory", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._startHint);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._endHint);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._fieldStatus === "PENDING" && !ctx._pinningState);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._fieldErr);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._handyNgUserService.loggedInStatus && ctx._pinningState && !ctx._disableFieldPin);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_7__["NgIf"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgModel"], _handy_date_input_handy_date_input_component__WEBPACK_IMPORTED_MODULE_3__["HandyDateInputComponent"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_8__["MatLabel"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_8__["MatHint"], _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_9__["MatProgressSpinner"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_8__["MatSuffix"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_8__["MatError"], _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_10__["MatTooltip"], _angular_material_button__WEBPACK_IMPORTED_MODULE_11__["MatButton"], _modules_shared_components_handy_icon_handy_icon_component__WEBPACK_IMPORTED_MODULE_12__["HandyIconComponent"]], pipes: [_handy_ng_pipes_truncate_pipe__WEBPACK_IMPORTED_MODULE_13__["TruncatePipe"]], styles: [".data-range-elements[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  grid-gap: 1.2rem;\n}\n\n.data-range-content[_ngcontent-%COMP%] {\n  position: relative;\n}\n\n.data-range-content[_ngcontent-%COMP%]    > button[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0.5rem;\n  right: -0.8rem;\n}\n\nmat-progress-spinner[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0.5rem;\n  right: 0.3rem;\n}\n\n@media only screen and (max-width: 500px) {\n  .data-range-elements[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(1, 1fr);\n    grid-gap: 0;\n  }\n}\n\n[_nghost-%COMP%] {\n  display: block;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvaGFuZHkvbW9kdWxlcy9oYW5keS1mb3JtL2NvbXBvbmVudHMvaGFuZHktZGF0ZS1yYW5nZS1pbnB1dC9oYW5keS1kYXRlLXJhbmdlLWlucHV0LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksYUFBQTtFQUNBLHFDQUFBO0VBQ0EsZ0JBQUE7QUFDSjs7QUFFQTtFQUNJLGtCQUFBO0FBQ0o7O0FBQ0k7RUFDSSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxjQUFBO0FBQ1I7O0FBR0E7RUFDSSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxhQUFBO0FBQUo7O0FBS0E7RUFDSTtJQUNJLHFDQUFBO0lBQ0EsV0FBQTtFQUZOO0FBQ0Y7O0FBTUM7RUFDRSxjQUFBO0FBSkgiLCJmaWxlIjoic3JjL2FwcC9oYW5keS9tb2R1bGVzL2hhbmR5LWZvcm0vY29tcG9uZW50cy9oYW5keS1kYXRlLXJhbmdlLWlucHV0L2hhbmR5LWRhdGUtcmFuZ2UtaW5wdXQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuZGF0YS1yYW5nZS1lbGVtZW50cyB7XHJcbiAgICBkaXNwbGF5OiBncmlkO1xyXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMiwgMWZyKTtcclxuICAgIGdyaWQtZ2FwOiAxLjJyZW07XHJcbn1cclxuXHJcbi5kYXRhLXJhbmdlLWNvbnRlbnQge1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG5cclxuICAgICY+YnV0dG9uIHtcclxuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgICAgdG9wOiAuNXJlbTtcclxuICAgICAgICByaWdodDogLS44cmVtO1xyXG4gICAgfVxyXG59XHJcblxyXG5tYXQtcHJvZ3Jlc3Mtc3Bpbm5lciB7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICB0b3A6IDAuNXJlbTtcclxuICAgIHJpZ2h0OiAuM3JlbTtcclxufVxyXG5cclxuXHJcblxyXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDUwMHB4KSB7XHJcbiAgICAuZGF0YS1yYW5nZS1lbGVtZW50cyB7XHJcbiAgICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMSwgMWZyKTtcclxuICAgICAgICBncmlkLWdhcDogMDtcclxuXHJcbiAgICB9XHJcbn1cclxuXHJcbiA6aG9zdCB7XHJcbiAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gfSJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](HandyDateRangeInputComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'handy-date-range-input',
                templateUrl: './handy-date-range-input.component.html',
                styleUrls: ['./handy-date-range-input.component.scss'],
                inputs: [
                    'appearance', 'disabled',
                    'debounceTime', 'fieldName',
                    'pinningValue', 'disableFieldPin',
                    'fromStartHint', 'toStartHint', 'fromEndHint', 'toEndHint',
                    'fromLabel', 'toLabel', 'fromPlaceholder', 'toPlaceholder',
                    'showTimeZone', 'selectableTimezone', 'getTime', 'getFullToDay',
                    'fromMinDate', 'fromMaxDate', 'toMinDate', 'toMaxDate',
                    'fromStartDate', 'toStartDate', 'minDaysRange', 'maxDaysRange',
                    'fromMinTime', 'fromMaxTime', 'toMinTime', 'toMaxTime',
                    'setToTime', 'setFromTime', 'fromSimpleFilter', 'toSimpleFilter',
                    'fromTimeZone', 'toTimeZone', 'fromCustomilter', 'toCustomFilter',
                    'fromDateClass', 'toDateClass',
                ],
                outputs: [
                    'valueChange', 'statusChange', 'prefixClick', 'sufixClick'
                ]
            }]
    }], function () { return [{ type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgControl"], decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
            }, {
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Self"]
            }] }, { type: _handy_ng_services__WEBPACK_IMPORTED_MODULE_5__["HandyNgUserService"] }, { type: _handy_form_handy_form_component__WEBPACK_IMPORTED_MODULE_6__["HandyFormComponent"], decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
            }] }]; }, { fromStartHint: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], toStartHint: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], fromEndHint: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], toEndHint: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], fromLabel: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], toLabel: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], fromPlaceholder: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], toPlaceholder: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], showTimeZone: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], selectableTimezone: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], getTime: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], getFullToDay: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], fromMinDate: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], fromMaxDate: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], toMinDate: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], toMaxDate: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], fromStartDate: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], toStartDate: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], minDaysRange: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], maxDaysRange: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], fromMinTime: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], fromMaxTime: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], toMinTime: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], toMaxTime: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], setToTime: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], setFromTime: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], fromSimpleFilter: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], toSimpleFilter: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], fromTimeZone: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], toTimeZone: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], fromCustomilter: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], toCustomFilter: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], fromDateClass: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], toDateClass: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], fromInput: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: ['fromInput', { static: false, read: _handy_date_input_handy_date_input_component__WEBPACK_IMPORTED_MODULE_3__["HandyDateInputComponent"] }]
        }], toInput: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: ['toInput', { static: false, read: _handy_date_input_handy_date_input_component__WEBPACK_IMPORTED_MODULE_3__["HandyDateInputComponent"] }]
        }] }); })();


/***/ }),

/***/ "./src/app/handy/modules/handy-form/components/handy-irl-county-select-input/handy-irl-county-select-input.ts":
/*!********************************************************************************************************************!*\
  !*** ./src/app/handy/modules/handy-form/components/handy-irl-county-select-input/handy-irl-county-select-input.ts ***!
  \********************************************************************************************************************/
/*! exports provided: HandyIrlCountySelectInputComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HandyIrlCountySelectInputComponent", function() { return HandyIrlCountySelectInputComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _handy_ng_extenders_handy_form_contol__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @handy-ng/extenders/handy-form-contol */ "./src/app/handy/extenders/handy-form-contol.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _handy_ng_services__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @handy-ng/services */ "./src/app/handy/services/index.ts");
/* harmony import */ var _handy_form_handy_form_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../handy-form/handy-form.component */ "./src/app/handy/modules/handy-form/components/handy-form/handy-form.component.ts");
/* harmony import */ var _handy_ng_directives_is_desktop_directive__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @handy-ng/directives/is-desktop.directive */ "./src/app/handy/directives/is-desktop.directive.ts");
/* harmony import */ var _handy_ng_directives_is_mobile_directive__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @handy-ng/directives/is-mobile.directive */ "./src/app/handy/directives/is-mobile.directive.ts");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/form-field */ "./node_modules/@angular/material/fesm2015/form-field.js");
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/select */ "./node_modules/@angular/material/fesm2015/select.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/core */ "./node_modules/@angular/material/fesm2015/core.js");
/* harmony import */ var _modules_shared_components_handy_icon_handy_icon_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../../modules/shared/components/handy-icon/handy-icon.component */ "./src/app/modules/shared/components/handy-icon/handy-icon.component.ts");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/fesm2015/button.js");
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/progress-spinner */ "./node_modules/@angular/material/fesm2015/progress-spinner.js");
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/tooltip */ "./node_modules/@angular/material/fesm2015/tooltip.js");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/input */ "./node_modules/@angular/material/fesm2015/input.js");
/* harmony import */ var _handy_ng_pipes_truncate_pipe__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @handy-ng/pipes/truncate.pipe */ "./src/app/handy/pipes/truncate.pipe.ts");


















const _c0 = ["inputField"];
function HandyIrlCountySelectInputComponent_mat_form_field_0_ng_container_5_mat_option_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-option", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const option_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", option_r13["value"])("disabled", option_r13.disabled);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", option_r13["displayValue"], " ");
} }
function HandyIrlCountySelectInputComponent_mat_form_field_0_ng_container_5_mat_optgroup_2_mat_option_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-option", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const childOption_r18 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", childOption_r18["value"])("disabled", childOption_r18.disabled);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", childOption_r18["displayValue"], " ");
} }
function HandyIrlCountySelectInputComponent_mat_form_field_0_ng_container_5_mat_optgroup_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-optgroup", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, HandyIrlCountySelectInputComponent_mat_form_field_0_ng_container_5_mat_optgroup_2_mat_option_1_Template, 2, 3, "mat-option", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const option_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("label", option_r13["label"])("disabled", option_r13.disabled);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", option_r13["options"]);
} }
function HandyIrlCountySelectInputComponent_mat_form_field_0_ng_container_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, HandyIrlCountySelectInputComponent_mat_form_field_0_ng_container_5_mat_option_1_Template, 2, 3, "mat-option", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, HandyIrlCountySelectInputComponent_mat_form_field_0_ng_container_5_mat_optgroup_2_Template, 2, 3, "mat-optgroup", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const option_r13 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !option_r13["label"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", option_r13["label"]);
} }
function HandyIrlCountySelectInputComponent_mat_form_field_0_handy_icon_6_Template(rf, ctx) { if (rf & 1) {
    const _r21 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "handy-icon", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HandyIrlCountySelectInputComponent_mat_form_field_0_handy_icon_6_Template_handy_icon_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r21); const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r20.triggerPrefixClick(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("size", ctx_r4._prefixAndSufixIconSize)("icon", ctx_r4._prefixIcon);
} }
function HandyIrlCountySelectInputComponent_mat_form_field_0_handy_icon_7_Template(rf, ctx) { if (rf & 1) {
    const _r23 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "handy-icon", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HandyIrlCountySelectInputComponent_mat_form_field_0_handy_icon_7_Template_handy_icon_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r23); const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r22.triggerSufixClick(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("size", ctx_r5._prefixAndSufixIconSize)("icon", ctx_r5._sufixIcon);
} }
function HandyIrlCountySelectInputComponent_mat_form_field_0_button_8_Template(rf, ctx) { if (rf & 1) {
    const _r25 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HandyIrlCountySelectInputComponent_mat_form_field_0_button_8_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r25); const ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r24.handlePinClick(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "handy-icon", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("size", 16)("icon", ctx_r6._hasPinnedVal ? "lock" : "lock_open");
} }
function HandyIrlCountySelectInputComponent_mat_form_field_0_span_9_Template(rf, ctx) { if (rf & 1) {
    const _r27 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HandyIrlCountySelectInputComponent_mat_form_field_0_span_9_Template_span_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r27); const ctx_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r26.triggerPrefixClick(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r7._prefixText);
} }
function HandyIrlCountySelectInputComponent_mat_form_field_0_span_10_Template(rf, ctx) { if (rf & 1) {
    const _r29 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HandyIrlCountySelectInputComponent_mat_form_field_0_span_10_Template_span_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r29); const ctx_r28 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r28.triggerSufixClick(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r8._sufixText);
} }
function HandyIrlCountySelectInputComponent_mat_form_field_0_mat_progress_spinner_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "mat-progress-spinner", 26);
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("diameter", 16);
} }
function HandyIrlCountySelectInputComponent_mat_form_field_0_mat_hint_12_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-hint", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r10._startHint);
} }
function HandyIrlCountySelectInputComponent_mat_form_field_0_mat_hint_13_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-hint", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r11._endHint);
} }
function HandyIrlCountySelectInputComponent_mat_form_field_0_mat_error_14_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-error", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "truncate");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matTooltip", ctx_r12._fieldErr);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](2, 2, ctx_r12._fieldErr));
} }
function HandyIrlCountySelectInputComponent_mat_form_field_0_Template(rf, ctx) { if (rf & 1) {
    const _r31 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-form-field", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "mat-select", 3, 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function HandyIrlCountySelectInputComponent_mat_form_field_0_Template_mat_select_ngModelChange_3_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r31); const ctx_r30 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r30._value = $event; })("ngModelChange", function HandyIrlCountySelectInputComponent_mat_form_field_0_Template_mat_select_ngModelChange_3_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r31); const ctx_r32 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r32.updateChanges(); })("focus", function HandyIrlCountySelectInputComponent_mat_form_field_0_Template_mat_select_focus_3_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r31); const ctx_r33 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r33.onTouched(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, HandyIrlCountySelectInputComponent_mat_form_field_0_ng_container_5_Template, 3, 2, "ng-container", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, HandyIrlCountySelectInputComponent_mat_form_field_0_handy_icon_6_Template, 1, 2, "handy-icon", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, HandyIrlCountySelectInputComponent_mat_form_field_0_handy_icon_7_Template, 1, 2, "handy-icon", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](8, HandyIrlCountySelectInputComponent_mat_form_field_0_button_8_Template, 2, 2, "button", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, HandyIrlCountySelectInputComponent_mat_form_field_0_span_9_Template, 2, 1, "span", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](10, HandyIrlCountySelectInputComponent_mat_form_field_0_span_10_Template, 2, 1, "span", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, HandyIrlCountySelectInputComponent_mat_form_field_0_mat_progress_spinner_11_Template, 1, 1, "mat-progress-spinner", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](12, HandyIrlCountySelectInputComponent_mat_form_field_0_mat_hint_12_Template, 2, 1, "mat-hint", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](13, HandyIrlCountySelectInputComponent_mat_form_field_0_mat_hint_13_Template, 2, 1, "mat-hint", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](14, HandyIrlCountySelectInputComponent_mat_form_field_0_mat_error_14_Template, 3, 4, "mat-error", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("appearance", ctx_r0._appearance);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r0._label);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx_r0._value)("disabled", ctx_r0._isDisabled);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r0._options);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r0._prefixIcon && ctx_r0._fieldStatus !== "PENDING" && !ctx_r0._pinningState);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r0._sufixIcon && ctx_r0._fieldStatus !== "PENDING" && !ctx_r0._pinningState);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r0._handyNgUserService.loggedInStatus && ctx_r0._pinningState && !ctx_r0._disableFieldPin);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r0._prefixText && ctx_r0._fieldStatus !== "PENDING" && !ctx_r0._pinningState);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r0._sufixText && ctx_r0._fieldStatus !== "PENDING" && !ctx_r0._pinningState);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r0._fieldStatus === "PENDING" && !ctx_r0._pinningState);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r0._startHint);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r0._endHint);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r0._fieldErr);
} }
function HandyIrlCountySelectInputComponent_mat_form_field_1_ng_container_5_option_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "option", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const option_r45 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", option_r45["value"])("disabled", option_r45.disabled);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", option_r45["displayValue"], " ");
} }
function HandyIrlCountySelectInputComponent_mat_form_field_1_ng_container_5_optgroup_2_option_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "option", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const childOption_r50 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", childOption_r50["value"])("disabled", childOption_r50.disabled);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", childOption_r50["displayValue"], " ");
} }
function HandyIrlCountySelectInputComponent_mat_form_field_1_ng_container_5_optgroup_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "optgroup", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, HandyIrlCountySelectInputComponent_mat_form_field_1_ng_container_5_optgroup_2_option_1_Template, 2, 3, "option", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const option_r45 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("label", option_r45["label"])("disabled", option_r45.disabled);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", option_r45["options"]);
} }
function HandyIrlCountySelectInputComponent_mat_form_field_1_ng_container_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, HandyIrlCountySelectInputComponent_mat_form_field_1_ng_container_5_option_1_Template, 2, 3, "option", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, HandyIrlCountySelectInputComponent_mat_form_field_1_ng_container_5_optgroup_2_Template, 2, 3, "optgroup", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const option_r45 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !option_r45["label"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", option_r45["label"]);
} }
function HandyIrlCountySelectInputComponent_mat_form_field_1_handy_icon_6_Template(rf, ctx) { if (rf & 1) {
    const _r53 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "handy-icon", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HandyIrlCountySelectInputComponent_mat_form_field_1_handy_icon_6_Template_handy_icon_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r53); const ctx_r52 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r52.triggerPrefixClick(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r36 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("size", ctx_r36._prefixAndSufixIconSize)("icon", ctx_r36._prefixIcon);
} }
function HandyIrlCountySelectInputComponent_mat_form_field_1_handy_icon_7_Template(rf, ctx) { if (rf & 1) {
    const _r55 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "handy-icon", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HandyIrlCountySelectInputComponent_mat_form_field_1_handy_icon_7_Template_handy_icon_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r55); const ctx_r54 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r54.triggerSufixClick(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r37 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("size", ctx_r37._prefixAndSufixIconSize)("icon", ctx_r37._sufixIcon);
} }
function HandyIrlCountySelectInputComponent_mat_form_field_1_button_8_Template(rf, ctx) { if (rf & 1) {
    const _r57 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HandyIrlCountySelectInputComponent_mat_form_field_1_button_8_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r57); const ctx_r56 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r56.handlePinClick(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "handy-icon", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r38 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("size", 16)("icon", ctx_r38._hasPinnedVal ? "lock" : "lock_open");
} }
function HandyIrlCountySelectInputComponent_mat_form_field_1_span_9_Template(rf, ctx) { if (rf & 1) {
    const _r59 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HandyIrlCountySelectInputComponent_mat_form_field_1_span_9_Template_span_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r59); const ctx_r58 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r58.triggerPrefixClick(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r39 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r39._prefixText);
} }
function HandyIrlCountySelectInputComponent_mat_form_field_1_span_10_Template(rf, ctx) { if (rf & 1) {
    const _r61 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HandyIrlCountySelectInputComponent_mat_form_field_1_span_10_Template_span_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r61); const ctx_r60 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r60.triggerSufixClick(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r40 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r40._sufixText);
} }
function HandyIrlCountySelectInputComponent_mat_form_field_1_mat_progress_spinner_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "mat-progress-spinner", 26);
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("diameter", 16);
} }
function HandyIrlCountySelectInputComponent_mat_form_field_1_mat_hint_12_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-hint", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r42 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r42._startHint);
} }
function HandyIrlCountySelectInputComponent_mat_form_field_1_mat_hint_13_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-hint", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r43 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r43._endHint);
} }
function HandyIrlCountySelectInputComponent_mat_form_field_1_mat_error_14_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-error", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "truncate");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r44 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matTooltip", ctx_r44._fieldErr);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](2, 2, ctx_r44._fieldErr));
} }
function HandyIrlCountySelectInputComponent_mat_form_field_1_Template(rf, ctx) { if (rf & 1) {
    const _r63 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-form-field", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "select", 30, 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function HandyIrlCountySelectInputComponent_mat_form_field_1_Template_select_ngModelChange_3_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r63); const ctx_r62 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r62._value = $event; })("ngModelChange", function HandyIrlCountySelectInputComponent_mat_form_field_1_Template_select_ngModelChange_3_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r63); const ctx_r64 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r64.updateChanges(); })("focus", function HandyIrlCountySelectInputComponent_mat_form_field_1_Template_select_focus_3_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r63); const ctx_r65 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r65.onTouched(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, HandyIrlCountySelectInputComponent_mat_form_field_1_ng_container_5_Template, 3, 2, "ng-container", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, HandyIrlCountySelectInputComponent_mat_form_field_1_handy_icon_6_Template, 1, 2, "handy-icon", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, HandyIrlCountySelectInputComponent_mat_form_field_1_handy_icon_7_Template, 1, 2, "handy-icon", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](8, HandyIrlCountySelectInputComponent_mat_form_field_1_button_8_Template, 2, 2, "button", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, HandyIrlCountySelectInputComponent_mat_form_field_1_span_9_Template, 2, 1, "span", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](10, HandyIrlCountySelectInputComponent_mat_form_field_1_span_10_Template, 2, 1, "span", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, HandyIrlCountySelectInputComponent_mat_form_field_1_mat_progress_spinner_11_Template, 1, 1, "mat-progress-spinner", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](12, HandyIrlCountySelectInputComponent_mat_form_field_1_mat_hint_12_Template, 2, 1, "mat-hint", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](13, HandyIrlCountySelectInputComponent_mat_form_field_1_mat_hint_13_Template, 2, 1, "mat-hint", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](14, HandyIrlCountySelectInputComponent_mat_form_field_1_mat_error_14_Template, 3, 4, "mat-error", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("appearance", ctx_r1._appearance);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r1._label);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx_r1._value)("disabled", ctx_r1._isDisabled);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r1._options);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r1._prefixIcon && ctx_r1._fieldStatus !== "PENDING" && !ctx_r1._pinningState);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r1._sufixIcon && ctx_r1._fieldStatus !== "PENDING" && !ctx_r1._pinningState);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r1._handyNgUserService.loggedInStatus && ctx_r1._pinningState && !ctx_r1._disableFieldPin);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r1._prefixText && ctx_r1._fieldStatus !== "PENDING" && !ctx_r1._pinningState);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r1._sufixText && ctx_r1._fieldStatus !== "PENDING" && !ctx_r1._pinningState);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r1._fieldStatus === "PENDING" && !ctx_r1._pinningState);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r1._startHint);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r1._endHint);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r1._fieldErr);
} }
class HandyIrlCountySelectInputComponent extends _handy_ng_extenders_handy_form_contol__WEBPACK_IMPORTED_MODULE_1__["HandyFormControl"] {
    constructor(ngControl, _handyNgUserService, _parentFormComponent, _handyNgLayoutService, __handyNgUtilsService) {
        super(ngControl, _handyNgUserService, _parentFormComponent);
        this.ngControl = ngControl;
        this._handyNgUserService = _handyNgUserService;
        this._parentFormComponent = _parentFormComponent;
        this._handyNgLayoutService = _handyNgLayoutService;
        this.__handyNgUtilsService = __handyNgUtilsService;
        this._UcFirstValue = false;
        this._hasEmptyOption = true;
        this._emptyOptionLabel = 'Select county';
        this._options = [];
        this.countiesList = [
            'antrim',
            'armagh',
            'carlow',
            'cavan',
            'clare',
            'cork',
            'derry',
            'donegal',
            'down',
            'dublin',
            'fermanagh',
            'galway',
            'kerry',
            'kildare',
            'kilkenny',
            'laois',
            'leitrim',
            'limerick',
            'longford',
            'louth',
            'mayo',
            'meath',
            'monaghan',
            'offaly',
            'roscommon',
            'sligo',
            'tipperary',
            'tyrone',
            'waterford',
            'westmeath',
            'wexford',
            'wicklow',
        ];
        this.ucCountiesList = [];
        this._stringifyPrefix = '_hngso_';
        let countiesLen = this.countiesList.length;
        for (let i = 0; i < countiesLen; i++) {
            const singleCounty = this.countiesList[i];
            this.ucCountiesList.push(singleCounty.charAt(0).toUpperCase() + singleCounty.slice(1));
        }
        this.publicCountiesList = {
            uc: [...this.ucCountiesList],
            lc: [...this.countiesList]
        };
    }
    set UcFirstValue(set) {
        this._UcFirstValue = set;
    }
    set hasEmptyOption(set) {
        this._hasEmptyOption = set;
    }
    set emptyOptionLabel(set) {
        this._emptyOptionLabel = set;
    }
    set options(set) {
        this._options = this._parseSelectOptions(set);
    }
    _parseSelectOptions(inputData) {
        let result = [];
        if (!Array.isArray(inputData)) {
            return result;
        }
        let optionsLen = inputData.length;
        if (optionsLen === 0) {
            return result;
        }
        let isSimple = (typeof inputData[0] === 'string' || typeof inputData[0] === 'number');
        if (isSimple) {
            for (let i = 0; i < optionsLen; i++) {
                const singleOption = inputData[i];
                result.push({
                    value: singleOption,
                    displayValue: this.__handyNgUtilsService.UcFirst(singleOption),
                });
            }
        }
        else {
            result = inputData;
        }
        if (this._hasEmptyOption) {
            result.unshift({
                value: null,
                displayValue: this._emptyOptionLabel
            });
        }
        return this._stringifySelectOptions(result);
    }
    _stringifySelectOptions(data = []) {
        if (!this._handyNgLayoutService.isMobile) {
            return data;
        }
        let result = [];
        let optionsLen = data.length;
        for (let i = 0; i < optionsLen; i++) {
            const singleOption = data[i];
            if (singleOption['label']) {
                singleOption['options'] = this._stringifySelectOptions(singleOption['options']);
            }
            else {
                let value = singleOption['value'];
                singleOption['value'] = (typeof value === 'string') ? value : `${this._stringifyPrefix}${JSON.stringify(value)}`;
            }
            result.push(singleOption);
        }
        return result;
    }
    _unstringifySelectValue(value) {
        if (typeof value === 'string' && value.startsWith(this._stringifyPrefix)) {
            return JSON.parse(value.replace(this._stringifyPrefix, ''));
        }
        return value;
    }
    registerOnChange(fn) {
        if (!this._handyNgLayoutService.isMobile) {
            this.onChange = fn;
            return;
        }
        this.onChange = (value) => {
            value = this._unstringifySelectValue(this._value);
            return fn(value);
        };
    }
    ngOnInit() {
        this.options = this._UcFirstValue ? this.ucCountiesList : this.countiesList;
        super.ngOnInit();
    }
    ngOnDestroy() {
        super.ngOnDestroy();
    }
}
HandyIrlCountySelectInputComponent.ɵfac = function HandyIrlCountySelectInputComponent_Factory(t) { return new (t || HandyIrlCountySelectInputComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControl"], 10), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_handy_ng_services__WEBPACK_IMPORTED_MODULE_3__["HandyNgUserService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_handy_form_handy_form_component__WEBPACK_IMPORTED_MODULE_4__["HandyFormComponent"], 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_handy_ng_services__WEBPACK_IMPORTED_MODULE_3__["HandyNgLayoutService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_handy_ng_services__WEBPACK_IMPORTED_MODULE_3__["HandyNgUtilsService"])); };
HandyIrlCountySelectInputComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: HandyIrlCountySelectInputComponent, selectors: [["handy-irl-county-select-input"]], viewQuery: function HandyIrlCountySelectInputComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, true);
    } if (rf & 2) {
        var _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._inputField = _t.first);
    } }, inputs: { appearance: "appearance", label: "label", disabled: "disabled", prefixText: "prefixText", sufixText: "sufixText", prefixIcon: "prefixIcon", sufixIcon: "sufixIcon", debounceTime: "debounceTime", startHint: "startHint", endHint: "endHint", fieldName: "fieldName", pinningValue: "pinningValue", disableFieldPin: "disableFieldPin", hasEmptyOption: "hasEmptyOption", emptyOptionLabel: "emptyOptionLabel", UcFirstValue: "UcFirstValue" }, outputs: { valueChange: "valueChange", statusChange: "statusChange", prefixClick: "prefixClick", sufixClick: "sufixClick" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]], decls: 2, vars: 0, consts: [[3, "appearance", 4, "desktop"], [3, "appearance", 4, "mobile"], [3, "appearance"], [3, "ngModel", "disabled", "ngModelChange", "focus"], ["inputField", "ngModel"], [4, "ngFor", "ngForOf"], ["matPrefix", "", 3, "size", "icon", "click", 4, "ngIf"], ["matSuffix", "", 3, "size", "icon", "click", 4, "ngIf"], ["mat-icon-button", "", "matSuffix", "", 3, "click", 4, "ngIf"], ["matPrefix", "", 3, "click", 4, "ngIf"], ["matSuffix", "", 3, "click", 4, "ngIf"], ["matSuffix", "", "color", "primary", "mode", "indeterminate", 3, "diameter", 4, "ngIf"], ["align", "start", 4, "ngIf"], ["align", "end", 4, "ngIf"], [3, "matTooltip", 4, "ngIf"], [3, "value", "disabled", 4, "ngIf"], [3, "label", "disabled", 4, "ngIf"], [3, "value", "disabled"], [3, "label", "disabled"], [3, "value", "disabled", 4, "ngFor", "ngForOf"], ["matPrefix", "", 3, "size", "icon", "click"], ["matSuffix", "", 3, "size", "icon", "click"], ["mat-icon-button", "", "matSuffix", "", 3, "click"], [3, "size", "icon"], ["matPrefix", "", 3, "click"], ["matSuffix", "", 3, "click"], ["matSuffix", "", "color", "primary", "mode", "indeterminate", 3, "diameter"], ["align", "start"], ["align", "end"], [3, "matTooltip"], ["matNativeControl", "", 3, "ngModel", "disabled", "ngModelChange", "focus"]], template: function HandyIrlCountySelectInputComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, HandyIrlCountySelectInputComponent_mat_form_field_0_Template, 15, 14, "mat-form-field", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, HandyIrlCountySelectInputComponent_mat_form_field_1_Template, 15, 14, "mat-form-field", 1);
    } }, directives: [_handy_ng_directives_is_desktop_directive__WEBPACK_IMPORTED_MODULE_5__["IsDesktopDirective"], _handy_ng_directives_is_mobile_directive__WEBPACK_IMPORTED_MODULE_6__["IsMobileDirective"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__["MatFormField"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__["MatLabel"], _angular_material_select__WEBPACK_IMPORTED_MODULE_8__["MatSelect"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgModel"], _angular_common__WEBPACK_IMPORTED_MODULE_9__["NgForOf"], _angular_common__WEBPACK_IMPORTED_MODULE_9__["NgIf"], _angular_material_core__WEBPACK_IMPORTED_MODULE_10__["MatOption"], _angular_material_core__WEBPACK_IMPORTED_MODULE_10__["MatOptgroup"], _modules_shared_components_handy_icon_handy_icon_component__WEBPACK_IMPORTED_MODULE_11__["HandyIconComponent"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__["MatPrefix"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__["MatSuffix"], _angular_material_button__WEBPACK_IMPORTED_MODULE_12__["MatButton"], _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_13__["MatProgressSpinner"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__["MatHint"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__["MatError"], _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_14__["MatTooltip"], _angular_material_input__WEBPACK_IMPORTED_MODULE_15__["MatInput"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["SelectControlValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgSelectOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ɵangular_packages_forms_forms_x"]], pipes: [_handy_ng_pipes_truncate_pipe__WEBPACK_IMPORTED_MODULE_16__["TruncatePipe"]], styles: ["[_nghost-%COMP%] {\n  display: block;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvaGFuZHkvbW9kdWxlcy9oYW5keS1mb3JtL2NvbXBvbmVudHMvaGFuZHktaXJsLWNvdW50eS1zZWxlY3QtaW5wdXQvaGFuZHktaXJsLWNvdW50eS1zZWxlY3QtaW5wdXQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGNBQUE7QUFDRiIsImZpbGUiOiJzcmMvYXBwL2hhbmR5L21vZHVsZXMvaGFuZHktZm9ybS9jb21wb25lbnRzL2hhbmR5LWlybC1jb3VudHktc2VsZWN0LWlucHV0L2hhbmR5LWlybC1jb3VudHktc2VsZWN0LWlucHV0LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdCB7XHJcbiAgZGlzcGxheTogYmxvY2s7XHJcbn1cclxuIl19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](HandyIrlCountySelectInputComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'handy-irl-county-select-input',
                templateUrl: './handy-irl-county-select-input.html',
                styleUrls: ['./handy-irl-county-select-input.scss'],
                inputs: [
                    'appearance', 'label', 'disabled',
                    'prefixText', 'sufixText', 'prefixIcon',
                    'sufixIcon',
                    'debounceTime', 'startHint', 'endHint', 'fieldName',
                    'pinningValue', 'disableFieldPin',
                    'hasEmptyOption', 'emptyOptionLabel', 'UcFirstValue'
                ],
                outputs: [
                    'valueChange', 'statusChange', 'prefixClick', 'sufixClick'
                ]
            }]
    }], function () { return [{ type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControl"], decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
            }, {
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Self"]
            }] }, { type: _handy_ng_services__WEBPACK_IMPORTED_MODULE_3__["HandyNgUserService"] }, { type: _handy_form_handy_form_component__WEBPACK_IMPORTED_MODULE_4__["HandyFormComponent"], decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
            }] }, { type: _handy_ng_services__WEBPACK_IMPORTED_MODULE_3__["HandyNgLayoutService"] }, { type: _handy_ng_services__WEBPACK_IMPORTED_MODULE_3__["HandyNgUtilsService"] }]; }, { _inputField: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: ['inputField', { static: false }]
        }], UcFirstValue: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], hasEmptyOption: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], emptyOptionLabel: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }] }); })();


/***/ }),

/***/ "./src/app/handy/modules/handy-form/components/handy-multi-select-input/handy-multi-select-input.component.ts":
/*!********************************************************************************************************************!*\
  !*** ./src/app/handy/modules/handy-form/components/handy-multi-select-input/handy-multi-select-input.component.ts ***!
  \********************************************************************************************************************/
/*! exports provided: HandyMultiSelectInputComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HandyMultiSelectInputComponent", function() { return HandyMultiSelectInputComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _handy_ng_extenders_handy_form_contol__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @handy-ng/extenders/handy-form-contol */ "./src/app/handy/extenders/handy-form-contol.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _handy_ng_services__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @handy-ng/services */ "./src/app/handy/services/index.ts");
/* harmony import */ var _handy_form_handy_form_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../handy-form/handy-form.component */ "./src/app/handy/modules/handy-form/components/handy-form/handy-form.component.ts");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/form-field */ "./node_modules/@angular/material/fesm2015/form-field.js");
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/select */ "./node_modules/@angular/material/fesm2015/select.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/core */ "./node_modules/@angular/material/fesm2015/core.js");
/* harmony import */ var _modules_shared_components_handy_icon_handy_icon_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../../modules/shared/components/handy-icon/handy-icon.component */ "./src/app/modules/shared/components/handy-icon/handy-icon.component.ts");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/fesm2015/button.js");
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/progress-spinner */ "./node_modules/@angular/material/fesm2015/progress-spinner.js");
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/tooltip */ "./node_modules/@angular/material/fesm2015/tooltip.js");
/* harmony import */ var _handy_ng_pipes_truncate_pipe__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @handy-ng/pipes/truncate.pipe */ "./src/app/handy/pipes/truncate.pipe.ts");















const _c0 = ["inputField"];
function HandyMultiSelectInputComponent_ng_container_5_mat_option_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-option", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const option_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", option_r11["value"])("disabled", option_r11.disabled || ctx_r12.lastDisabled(option_r11["value"]));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", option_r11["displayValue"], " ");
} }
function HandyMultiSelectInputComponent_ng_container_5_mat_optgroup_2_mat_option_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-option", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const childOption_r16 = ctx.$implicit;
    const option_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2).$implicit;
    const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", childOption_r16["value"])("disabled", childOption_r16.disabled || ctx_r15.lastDisabled(option_r11["value"]));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", childOption_r16["displayValue"], " ");
} }
function HandyMultiSelectInputComponent_ng_container_5_mat_optgroup_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-optgroup", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, HandyMultiSelectInputComponent_ng_container_5_mat_optgroup_2_mat_option_1_Template, 2, 3, "mat-option", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const option_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("label", option_r11["label"])("disabled", option_r11.disabled);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", option_r11["options"]);
} }
function HandyMultiSelectInputComponent_ng_container_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, HandyMultiSelectInputComponent_ng_container_5_mat_option_1_Template, 2, 3, "mat-option", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, HandyMultiSelectInputComponent_ng_container_5_mat_optgroup_2_Template, 2, 3, "mat-optgroup", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const option_r11 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !option_r11["label"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", option_r11["label"]);
} }
function HandyMultiSelectInputComponent_handy_icon_6_Template(rf, ctx) { if (rf & 1) {
    const _r20 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "handy-icon", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HandyMultiSelectInputComponent_handy_icon_6_Template_handy_icon_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r20); const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r19.triggerPrefixClick(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("size", ctx_r2._prefixAndSufixIconSize)("icon", ctx_r2._prefixIcon);
} }
function HandyMultiSelectInputComponent_handy_icon_7_Template(rf, ctx) { if (rf & 1) {
    const _r22 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "handy-icon", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HandyMultiSelectInputComponent_handy_icon_7_Template_handy_icon_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r22); const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r21.triggerSufixClick(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("size", ctx_r3._prefixAndSufixIconSize)("icon", ctx_r3._sufixIcon);
} }
function HandyMultiSelectInputComponent_button_8_Template(rf, ctx) { if (rf & 1) {
    const _r24 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HandyMultiSelectInputComponent_button_8_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r24); const ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r23.handlePinClick(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "handy-icon", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("size", 16)("icon", ctx_r4._hasPinnedVal ? "lock" : "lock_open");
} }
function HandyMultiSelectInputComponent_span_9_Template(rf, ctx) { if (rf & 1) {
    const _r26 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HandyMultiSelectInputComponent_span_9_Template_span_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r26); const ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r25.triggerPrefixClick(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r5._prefixText);
} }
function HandyMultiSelectInputComponent_span_10_Template(rf, ctx) { if (rf & 1) {
    const _r28 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HandyMultiSelectInputComponent_span_10_Template_span_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r28); const ctx_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r27.triggerSufixClick(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r6._sufixText);
} }
function HandyMultiSelectInputComponent_mat_progress_spinner_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "mat-progress-spinner", 24);
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("diameter", 16);
} }
function HandyMultiSelectInputComponent_mat_hint_12_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-hint", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r8._startHint);
} }
function HandyMultiSelectInputComponent_mat_hint_13_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-hint", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r9._endHint);
} }
function HandyMultiSelectInputComponent_mat_error_14_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-error", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "truncate");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matTooltip", ctx_r10._fieldErr);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](2, 2, ctx_r10._fieldErr));
} }
class HandyMultiSelectInputComponent extends _handy_ng_extenders_handy_form_contol__WEBPACK_IMPORTED_MODULE_1__["HandyFormControl"] {
    constructor(ngControl, _handyNgUserService, _parentFormComponent, _handyNgLayoutService) {
        super(ngControl, _handyNgUserService, _parentFormComponent);
        this.ngControl = ngControl;
        this._handyNgUserService = _handyNgUserService;
        this._parentFormComponent = _parentFormComponent;
        this._handyNgLayoutService = _handyNgLayoutService;
        this._hasEmptyOption = true;
        this._emptyOptionLabel = 'None';
        this._options = [];
        this._atLeastOne = false;
        this._stringifyPrefix = '_hngso_';
    }
    set hasEmptyOption(set) {
        this._hasEmptyOption = set;
    }
    set emptyOptionLabel(set) {
        this._emptyOptionLabel = set;
    }
    set options(set) {
        this._options = this._parseSelectOptions(JSON.parse(JSON.stringify(set)));
    }
    set atLeastOne(set) {
        this._atLeastOne = set;
    }
    _parseSelectOptions(inputData) {
        let result = [];
        if (!Array.isArray(inputData)) {
            return result;
        }
        let optionsLen = inputData.length;
        if (optionsLen === 0) {
            return result;
        }
        let isSimple = (typeof inputData[0] === 'string' || typeof inputData[0] === 'number');
        if (isSimple) {
            for (let i = 0; i < optionsLen; i++) {
                const singleOption = inputData[i];
                result.push({
                    value: singleOption,
                    displayValue: singleOption,
                });
            }
        }
        else {
            result = [...inputData];
        }
        if (this._hasEmptyOption) {
            result.unshift({
                value: null,
                displayValue: this._emptyOptionLabel
            });
        }
        return result;
    }
    lastDisabled(val) {
        if (!this._atLeastOne) {
            return false;
        }
        if (Array.isArray(this._value) && this._value.length === 1 && val === this._value[0]) {
            return true;
        }
        return false;
    }
    // ! not sure why commented out..
    // protected _stringifySelectOptions(data: HandyNgSelectOptionsData = []): HandyNgSelectOptionsData {
    //   let result: HandyNgSelectOptionsData = [];
    //   let optionsLen: number = data.length;
    //   for (let i = 0; i < optionsLen; i++) {
    //     const singleOption = data[i];
    //     let parsedValue: string;
    //     if (singleOption['label']) {
    //       singleOption['options'] = this._stringifySelectOptions(singleOption['options']);
    //     } else {
    //       let value: any = singleOption['value'];
    //       singleOption['value'] = (typeof value === 'string') ? value : `${this._stringifyPrefix}${JSON.stringify(value)}`;
    //     }
    //     result.push(singleOption);
    //   }
    //   return result;
    // }
    // protected _unstringifySelectValue(value: any): any {
    //   if (typeof value === 'string' && value.startsWith(this._stringifyPrefix)) {
    //     return JSON.parse(value.replace(this._stringifyPrefix, ''));
    //   }
    //   return value;
    // }
    // public registerOnChange(fn: any): void {
    //   this.onChange = (value: any) => {
    //     let emitVal: any[] = null;
    //     if (Array.isArray(this._value)) {
    //       let selectedLen: number = this._value.length;
    //       if (selectedLen > 0) {
    //         emitVal = [];
    //         for (let i = 0; i < selectedLen; i++) {
    //           const singleSelectedValue = this._value[i];
    //           emitVal.push(this._unstringifySelectValue(this._value));
    //         }
    //       }
    //     }
    //     return fn(emitVal);
    //   };
    // }
    ngOnInit() {
        super.ngOnInit();
    }
    ngOnDestroy() {
        super.ngOnDestroy();
    }
}
HandyMultiSelectInputComponent.ɵfac = function HandyMultiSelectInputComponent_Factory(t) { return new (t || HandyMultiSelectInputComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControl"], 10), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_handy_ng_services__WEBPACK_IMPORTED_MODULE_3__["HandyNgUserService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_handy_form_handy_form_component__WEBPACK_IMPORTED_MODULE_4__["HandyFormComponent"], 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_handy_ng_services__WEBPACK_IMPORTED_MODULE_3__["HandyNgLayoutService"])); };
HandyMultiSelectInputComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: HandyMultiSelectInputComponent, selectors: [["handy-multi-select-input"]], viewQuery: function HandyMultiSelectInputComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, true);
    } if (rf & 2) {
        var _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._inputField = _t.first);
    } }, inputs: { appearance: "appearance", label: "label", disabled: "disabled", prefixText: "prefixText", sufixText: "sufixText", prefixIcon: "prefixIcon", sufixIcon: "sufixIcon", debounceTime: "debounceTime", startHint: "startHint", endHint: "endHint", fieldName: "fieldName", pinningValue: "pinningValue", disableFieldPin: "disableFieldPin", hasEmptyOption: "hasEmptyOption", emptyOptionLabel: "emptyOptionLabel", options: "options", atLeastOne: "atLeastOne" }, outputs: { valueChange: "valueChange", statusChange: "statusChange", prefixClick: "prefixClick", sufixClick: "sufixClick" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]], decls: 15, vars: 15, consts: [[3, "appearance"], ["multiple", "", 3, "ngModel", "disableRipple", "disabled", "ngModelChange", "focus"], ["inputField", "ngModel"], [4, "ngFor", "ngForOf"], ["matPrefix", "", 3, "size", "icon", "click", 4, "ngIf"], ["matSuffix", "", 3, "size", "icon", "click", 4, "ngIf"], ["mat-icon-button", "", "matSuffix", "", 3, "click", 4, "ngIf"], ["matPrefix", "", 3, "click", 4, "ngIf"], ["matSuffix", "", 3, "click", 4, "ngIf"], ["matSuffix", "", "color", "primary", "mode", "indeterminate", 3, "diameter", 4, "ngIf"], ["align", "start", 4, "ngIf"], ["align", "end", 4, "ngIf"], [3, "matTooltip", 4, "ngIf"], [3, "value", "disabled", 4, "ngIf"], [3, "label", "disabled", 4, "ngIf"], [3, "value", "disabled"], [3, "label", "disabled"], [3, "value", "disabled", 4, "ngFor", "ngForOf"], ["matPrefix", "", 3, "size", "icon", "click"], ["matSuffix", "", 3, "size", "icon", "click"], ["mat-icon-button", "", "matSuffix", "", 3, "click"], [3, "size", "icon"], ["matPrefix", "", 3, "click"], ["matSuffix", "", 3, "click"], ["matSuffix", "", "color", "primary", "mode", "indeterminate", 3, "diameter"], ["align", "start"], ["align", "end"], [3, "matTooltip"]], template: function HandyMultiSelectInputComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-form-field", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "mat-select", 1, 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function HandyMultiSelectInputComponent_Template_mat_select_ngModelChange_3_listener($event) { return ctx._value = $event; })("ngModelChange", function HandyMultiSelectInputComponent_Template_mat_select_ngModelChange_3_listener() { return ctx.updateChanges(); })("focus", function HandyMultiSelectInputComponent_Template_mat_select_focus_3_listener() { return ctx.onTouched(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, HandyMultiSelectInputComponent_ng_container_5_Template, 3, 2, "ng-container", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, HandyMultiSelectInputComponent_handy_icon_6_Template, 1, 2, "handy-icon", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, HandyMultiSelectInputComponent_handy_icon_7_Template, 1, 2, "handy-icon", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](8, HandyMultiSelectInputComponent_button_8_Template, 2, 2, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, HandyMultiSelectInputComponent_span_9_Template, 2, 1, "span", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](10, HandyMultiSelectInputComponent_span_10_Template, 2, 1, "span", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, HandyMultiSelectInputComponent_mat_progress_spinner_11_Template, 1, 1, "mat-progress-spinner", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](12, HandyMultiSelectInputComponent_mat_hint_12_Template, 2, 1, "mat-hint", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](13, HandyMultiSelectInputComponent_mat_hint_13_Template, 2, 1, "mat-hint", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](14, HandyMultiSelectInputComponent_mat_error_14_Template, 3, 4, "mat-error", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("appearance", ctx._appearance);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx._label);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx._value)("disableRipple", ctx._handyNgLayoutService.isMobile)("disabled", ctx._isDisabled);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx._options);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._prefixIcon && ctx._fieldStatus !== "PENDING" && !ctx._pinningState);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._sufixIcon && ctx._fieldStatus !== "PENDING" && !ctx._pinningState);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._handyNgUserService.loggedInStatus && ctx._pinningState && !ctx._disableFieldPin);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._prefixText && ctx._fieldStatus !== "PENDING" && !ctx._pinningState);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._sufixText && ctx._fieldStatus !== "PENDING" && !ctx._pinningState);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._fieldStatus === "PENDING" && !ctx._pinningState);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._startHint);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._endHint);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._fieldErr);
    } }, directives: [_angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__["MatFormField"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__["MatLabel"], _angular_material_select__WEBPACK_IMPORTED_MODULE_6__["MatSelect"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgModel"], _angular_common__WEBPACK_IMPORTED_MODULE_7__["NgForOf"], _angular_common__WEBPACK_IMPORTED_MODULE_7__["NgIf"], _angular_material_core__WEBPACK_IMPORTED_MODULE_8__["MatOption"], _angular_material_core__WEBPACK_IMPORTED_MODULE_8__["MatOptgroup"], _modules_shared_components_handy_icon_handy_icon_component__WEBPACK_IMPORTED_MODULE_9__["HandyIconComponent"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__["MatPrefix"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__["MatSuffix"], _angular_material_button__WEBPACK_IMPORTED_MODULE_10__["MatButton"], _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_11__["MatProgressSpinner"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__["MatHint"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__["MatError"], _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_12__["MatTooltip"]], pipes: [_handy_ng_pipes_truncate_pipe__WEBPACK_IMPORTED_MODULE_13__["TruncatePipe"]], styles: ["[_nghost-%COMP%] {\n  display: block;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvaGFuZHkvbW9kdWxlcy9oYW5keS1mb3JtL2NvbXBvbmVudHMvaGFuZHktbXVsdGktc2VsZWN0LWlucHV0L2hhbmR5LW11bHRpLXNlbGVjdC1pbnB1dC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQztFQUNFLGNBQUE7QUFDSCIsImZpbGUiOiJzcmMvYXBwL2hhbmR5L21vZHVsZXMvaGFuZHktZm9ybS9jb21wb25lbnRzL2hhbmR5LW11bHRpLXNlbGVjdC1pbnB1dC9oYW5keS1tdWx0aS1zZWxlY3QtaW5wdXQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIgOmhvc3Qge1xyXG4gICBkaXNwbGF5OiBibG9jaztcclxuIH0iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](HandyMultiSelectInputComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'handy-multi-select-input',
                templateUrl: './handy-multi-select-input.component.html',
                styleUrls: ['./handy-multi-select-input.component.scss'],
                inputs: [
                    'appearance', 'label', 'disabled',
                    'prefixText', 'sufixText', 'prefixIcon',
                    'sufixIcon',
                    'debounceTime', 'startHint', 'endHint', 'fieldName',
                    'pinningValue', 'disableFieldPin',
                    'hasEmptyOption', 'emptyOptionLabel', 'options',
                    'atLeastOne'
                ],
                outputs: [
                    'valueChange', 'statusChange', 'prefixClick', 'sufixClick'
                ]
            }]
    }], function () { return [{ type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControl"], decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
            }, {
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Self"]
            }] }, { type: _handy_ng_services__WEBPACK_IMPORTED_MODULE_3__["HandyNgUserService"] }, { type: _handy_form_handy_form_component__WEBPACK_IMPORTED_MODULE_4__["HandyFormComponent"], decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
            }] }, { type: _handy_ng_services__WEBPACK_IMPORTED_MODULE_3__["HandyNgLayoutService"] }]; }, { _inputField: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: ['inputField', { static: false }]
        }], hasEmptyOption: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], emptyOptionLabel: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], options: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], atLeastOne: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }] }); })();


/***/ }),

/***/ "./src/app/handy/modules/handy-form/components/handy-number-input/handy-number-input.component.ts":
/*!********************************************************************************************************!*\
  !*** ./src/app/handy/modules/handy-form/components/handy-number-input/handy-number-input.component.ts ***!
  \********************************************************************************************************/
/*! exports provided: HandyNumberInputComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HandyNumberInputComponent", function() { return HandyNumberInputComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _handy_ng_extenders_handy_form_contol__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @handy-ng/extenders/handy-form-contol */ "./src/app/handy/extenders/handy-form-contol.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _handy_ng_services__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @handy-ng/services */ "./src/app/handy/services/index.ts");
/* harmony import */ var _handy_form_handy_form_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../handy-form/handy-form.component */ "./src/app/handy/modules/handy-form/components/handy-form/handy-form.component.ts");
/* harmony import */ var _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/flex-layout/flex */ "./node_modules/@angular/flex-layout/esm2015/flex.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/form-field */ "./node_modules/@angular/material/fesm2015/form-field.js");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/input */ "./node_modules/@angular/material/fesm2015/input.js");
/* harmony import */ var _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/autocomplete */ "./node_modules/@angular/material/fesm2015/autocomplete.js");
/* harmony import */ var _modules_shared_components_buttons_icon_btn_icon_btn_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../../modules/shared/components/buttons/icon-btn/icon-btn.component */ "./src/app/modules/shared/components/buttons/icon-btn/icon-btn.component.ts");
/* harmony import */ var _modules_shared_components_handy_icon_handy_icon_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../../modules/shared/components/handy-icon/handy-icon.component */ "./src/app/modules/shared/components/handy-icon/handy-icon.component.ts");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/fesm2015/button.js");
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/progress-spinner */ "./node_modules/@angular/material/fesm2015/progress-spinner.js");
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/tooltip */ "./node_modules/@angular/material/fesm2015/tooltip.js");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/core */ "./node_modules/@angular/material/fesm2015/core.js");
/* harmony import */ var _handy_ng_pipes_truncate_pipe__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @handy-ng/pipes/truncate.pipe */ "./src/app/handy/pipes/truncate.pipe.ts");


















const _c0 = ["inputField"];
function HandyNumberInputComponent_ng_container_1_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r19 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "icon-btn", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HandyNumberInputComponent_ng_container_1_div_1_Template_icon_btn_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r19); const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r18.focusEvent.next(); })("click", function HandyNumberInputComponent_ng_container_1_div_1_Template_icon_btn_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r19); const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r20.stepClick(false); })("press", function HandyNumberInputComponent_ng_container_1_div_1_Template_icon_btn_press_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r19); const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r21.stepPressEvent(false); })("pressup", function HandyNumberInputComponent_ng_container_1_div_1_Template_icon_btn_pressup_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r19); const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r22.stepPressRelease(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "icon-btn", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("press", function HandyNumberInputComponent_ng_container_1_div_1_Template_icon_btn_press_3_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r19); const ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r23.stepPressEvent(); })("pressup", function HandyNumberInputComponent_ng_container_1_div_1_Template_icon_btn_pressup_3_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r19); const ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r24.stepPressRelease(); })("click", function HandyNumberInputComponent_ng_container_1_div_1_Template_icon_btn_click_3_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r19); const ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r25.focusEvent.next(); })("click", function HandyNumberInputComponent_ng_container_1_div_1_Template_icon_btn_click_3_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r19); const ctx_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r26.stepClick(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("color", ctx_r16._minusBtnColor)("disabled", ctx_r16._isDisabled || ctx_r16._value <= ctx_r16._minVal);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r16._step);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("color", ctx_r16._plusBtnColor)("disabled", ctx_r16._isDisabled || ctx_r16._value >= ctx_r16._maxVal);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r16._step);
} }
function HandyNumberInputComponent_ng_container_1_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    const _r28 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "icon-btn", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("press", function HandyNumberInputComponent_ng_container_1_ng_container_2_Template_icon_btn_press_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r28); const ctx_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r27.stepPressEvent(false); })("pressup", function HandyNumberInputComponent_ng_container_1_ng_container_2_Template_icon_btn_pressup_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r28); const ctx_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r29.stepPressRelease(); })("click", function HandyNumberInputComponent_ng_container_1_ng_container_2_Template_icon_btn_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r28); const ctx_r30 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r30.focusEvent.next(); })("click", function HandyNumberInputComponent_ng_container_1_ng_container_2_Template_icon_btn_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r28); const ctx_r31 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r31.stepClick(false); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("color", ctx_r17._minusBtnColor)("disabled", ctx_r17._isDisabled || ctx_r17._value <= ctx_r17._minVal);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r17._step);
} }
function HandyNumberInputComponent_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, HandyNumberInputComponent_ng_container_1_div_1_Template, 5, 6, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, HandyNumberInputComponent_ng_container_1_ng_container_2_Template, 3, 3, "ng-container", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r0._stepBtnsAlign === "start");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r0._stepBtnsAlign === "split");
} }
function HandyNumberInputComponent_mat_label_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r1._label);
} }
function HandyNumberInputComponent_handy_icon_6_Template(rf, ctx) { if (rf & 1) {
    const _r33 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "handy-icon", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HandyNumberInputComponent_handy_icon_6_Template_handy_icon_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r33); const ctx_r32 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r32.triggerPrefixClick(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("size", ctx_r3._prefixAndSufixIconSize)("icon", ctx_r3._prefixIcon);
} }
function HandyNumberInputComponent_handy_icon_7_Template(rf, ctx) { if (rf & 1) {
    const _r35 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "handy-icon", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HandyNumberInputComponent_handy_icon_7_Template_handy_icon_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r35); const ctx_r34 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r34.triggerSufixClick(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("size", ctx_r4._prefixAndSufixIconSize)("icon", ctx_r4._sufixIcon);
} }
function HandyNumberInputComponent_button_8_Template(rf, ctx) { if (rf & 1) {
    const _r37 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HandyNumberInputComponent_button_8_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r37); const ctx_r36 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r36.handlePinClick(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "handy-icon", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("size", 16)("icon", ctx_r5._hasPinnedVal ? "lock" : "lock_open");
} }
function HandyNumberInputComponent_span_9_Template(rf, ctx) { if (rf & 1) {
    const _r39 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HandyNumberInputComponent_span_9_Template_span_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r39); const ctx_r38 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r38.triggerPrefixClick(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r6._prefixText);
} }
function HandyNumberInputComponent_span_10_Template(rf, ctx) { if (rf & 1) {
    const _r41 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HandyNumberInputComponent_span_10_Template_span_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r41); const ctx_r40 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r40.triggerSufixClick(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r7._sufixText);
} }
function HandyNumberInputComponent_mat_progress_spinner_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "mat-progress-spinner", 24);
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("diameter", 16);
} }
function HandyNumberInputComponent_mat_hint_12_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-hint", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r9._startHint);
} }
function HandyNumberInputComponent_mat_hint_13_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-hint", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r10._endHint);
} }
function HandyNumberInputComponent_mat_error_14_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-error", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "truncate");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matTooltip", ctx_r11._fieldErr);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](2, 2, ctx_r11._fieldErr));
} }
function HandyNumberInputComponent_div_17_mat_option_1_Template(rf, ctx) { if (rf & 1) {
    const _r45 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-option", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("onSelectionChange", function HandyNumberInputComponent_div_17_mat_option_1_Template_mat_option_onSelectionChange_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r45); const option_r43 = ctx.$implicit; const ctx_r44 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r44.autocompleteSelected.next({ selectEvent: $event, emitVal: option_r43.emitVal }); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const option_r43 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", option_r43.fieldValue);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](option_r43.displayValue);
} }
function HandyNumberInputComponent_div_17_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, HandyNumberInputComponent_div_17_mat_option_1_Template, 2, 2, "mat-option", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](2, 1, ctx_r13._simpleAutocomplete));
} }
function HandyNumberInputComponent_div_18_mat_optgroup_1_mat_option_1_Template(rf, ctx) { if (rf & 1) {
    const _r51 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-option", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("onSelectionChange", function HandyNumberInputComponent_div_18_mat_optgroup_1_mat_option_1_Template_mat_option_onSelectionChange_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r51); const option_r49 = ctx.$implicit; const ctx_r50 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3); return ctx_r50.autocompleteSelected.next({ selectEvent: $event, emitVal: option_r49.emitVal }); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const option_r49 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", option_r49.fieldValue);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", option_r49.displayValue, " ");
} }
function HandyNumberInputComponent_div_18_mat_optgroup_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-optgroup", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, HandyNumberInputComponent_div_18_mat_optgroup_1_mat_option_1_Template, 2, 2, "mat-option", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const group_r47 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("label", group_r47.groupName);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", group_r47.groupOptions);
} }
function HandyNumberInputComponent_div_18_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, HandyNumberInputComponent_div_18_mat_optgroup_1_Template, 2, 2, "mat-optgroup", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](2, 1, ctx_r14._groupAutocomplete));
} }
function HandyNumberInputComponent_ng_container_19_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r55 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "icon-btn", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HandyNumberInputComponent_ng_container_19_div_1_Template_icon_btn_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r55); const ctx_r54 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r54.focusEvent.next(); })("click", function HandyNumberInputComponent_ng_container_19_div_1_Template_icon_btn_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r55); const ctx_r56 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r56.stepClick(false); })("press", function HandyNumberInputComponent_ng_container_19_div_1_Template_icon_btn_press_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r55); const ctx_r57 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r57.stepPressEvent(false); })("pressup", function HandyNumberInputComponent_ng_container_19_div_1_Template_icon_btn_pressup_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r55); const ctx_r58 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r58.stepPressRelease(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "icon-btn", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("press", function HandyNumberInputComponent_ng_container_19_div_1_Template_icon_btn_press_3_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r55); const ctx_r59 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r59.stepPressEvent(); })("pressup", function HandyNumberInputComponent_ng_container_19_div_1_Template_icon_btn_pressup_3_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r55); const ctx_r60 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r60.stepPressRelease(); })("click", function HandyNumberInputComponent_ng_container_19_div_1_Template_icon_btn_click_3_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r55); const ctx_r61 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r61.focusEvent.next(); })("click", function HandyNumberInputComponent_ng_container_19_div_1_Template_icon_btn_click_3_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r55); const ctx_r62 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r62.stepClick(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r52 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("color", ctx_r52._minusBtnColor)("disabled", ctx_r52._isDisabled || ctx_r52._value <= ctx_r52._minVal);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r52._step);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("color", ctx_r52._plusBtnColor)("disabled", ctx_r52._isDisabled || ctx_r52._value >= ctx_r52._maxVal);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r52._step);
} }
function HandyNumberInputComponent_ng_container_19_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    const _r64 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "icon-btn", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("press", function HandyNumberInputComponent_ng_container_19_ng_container_2_Template_icon_btn_press_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r64); const ctx_r63 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r63.stepPressEvent(); })("pressup", function HandyNumberInputComponent_ng_container_19_ng_container_2_Template_icon_btn_pressup_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r64); const ctx_r65 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r65.stepPressRelease(); })("click", function HandyNumberInputComponent_ng_container_19_ng_container_2_Template_icon_btn_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r64); const ctx_r66 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r66.focusEvent.next(); })("click", function HandyNumberInputComponent_ng_container_19_ng_container_2_Template_icon_btn_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r64); const ctx_r67 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r67.stepClick(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r53 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("color", ctx_r53._plusBtnColor)("disabled", ctx_r53._isDisabled || ctx_r53._value >= ctx_r53._maxVal);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r53._step);
} }
function HandyNumberInputComponent_ng_container_19_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, HandyNumberInputComponent_ng_container_19_div_1_Template, 5, 6, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, HandyNumberInputComponent_ng_container_19_ng_container_2_Template, 3, 3, "ng-container", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r15._stepBtnsAlign === "end");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r15._stepBtnsAlign === "split");
} }
class HandyNumberInputComponent extends _handy_ng_extenders_handy_form_contol__WEBPACK_IMPORTED_MODULE_1__["HandyFormControl"] {
    constructor(ngControl, _handyNgUserService, _parentFormComponent, handyNgLayoutService, __utilsService, __renderer, _injector) {
        super(ngControl, _handyNgUserService, _parentFormComponent);
        this.ngControl = ngControl;
        this._handyNgUserService = _handyNgUserService;
        this._parentFormComponent = _parentFormComponent;
        this.handyNgLayoutService = handyNgLayoutService;
        this.__utilsService = __utilsService;
        this.__renderer = __renderer;
        this._injector = _injector;
        this.blurEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.focusEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this._sumKeys = ['ArrowUp', 'ArrowDown'];
        this._digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        this._separatorkeys = [',', '.'];
        this._numpadEvents = ['NumPadBackSpace', 'NumPadClose'];
        this._keysToProcess = [...this._sumKeys, ...this._separatorkeys, ...this._digits, '-', ...this._numpadEvents];
        this._ignoredFinalValues = ['-', '.', ''];
        this._parsingDataHolder = {
            hasDecimal: false,
            decimalsLen: 0,
            hasVal: false,
            numVal: 0,
            inputFieldVal: null,
            strVal: '',
            valLen: 0,
            isNegativeNr: false,
            raw: null
        };
        this._numericInput = false;
        this._wholeNumber = false;
        this._maxDecimalsLen = 4;
        this._step = 1;
        this._stepBtns = false;
        this._stepBtnsAlign = 'end';
        this._minusBtnColor = null;
        this._plusBtnColor = null;
        this.__selected = false;
        this.__focused = false;
        this.randInputId = this.__utilsService.generateHash({ specialChars: false, emptySpace: false }, true);
        this._initialNumberParse = false;
        this._pressing = false;
    }
    set numericInput(set) {
        this._numericInput = set;
    }
    set wholeNumber(set) {
        if (this._wholeNumber !== set) {
            this._wholeNumber = set;
            this.updateChanges();
        }
    }
    set min(min) {
        this._minVal = min;
    }
    set max(max) {
        this._maxVal = max;
    }
    set maxDecimalsLen(max) {
        if (this._maxDecimalsLen !== max) {
            this._maxDecimalsLen = max;
            this.updateChanges();
        }
    }
    set step(max) {
        if (typeof max === 'number') {
            this._step = max;
        }
        else {
            this._step = 1;
        }
    }
    set stepBtns(set) {
        this._stepBtns = set;
    }
    set stepBtnsAlign(set) {
        this._stepBtnsAlign = set;
    }
    set minusBtnColor(set) {
        this._minusBtnColor = set;
    }
    set plusBtnColor(set) {
        this._plusBtnColor = set;
    }
    stepClick(add = true) {
        this.stepAction(add ? 'up' : 'down');
    }
    markAsFocused() {
        this.__focused = true;
    }
    preventWrongKeys(event) {
        let key = event.key;
        if (key === 'Enter') {
            this._inputFieldElm.nativeElement.blur();
            return;
        }
        if (!key || event.metaKey || event['ctrlKey']) {
            return;
        }
        // if (key === ',') {
        //   alert('Use "." period as the decimal separator');
        //   event.preventDefault();
        //   return;
        // }
        let { hasDecimal, isNegativeNr, decimalsLen, numVal, strVal, valLen } = this._parsingDataHolder;
        let cursorPosition = this._inputFieldElm.nativeElement.selectionStart;
        // ? blocking multiple decimal separators
        if (!this.__selected && this._separatorkeys.includes(key) && (hasDecimal || this._wholeNumber || (isNegativeNr && cursorPosition == 0))) {
            event.preventDefault();
            return;
        }
        // ? blocking adding minus elswhere than at the beginnign of a number
        if (key === '-' && (cursorPosition !== 0 || isNegativeNr)) {
            event.preventDefault();
            return;
        }
        // ? blocking any other characters than digits
        if (key.length === 1 && !this._keysToProcess.includes(key)) {
            event.preventDefault();
            return;
        }
        if (!this.__selected && this._digits.includes(key) && hasDecimal && decimalsLen >= this._maxDecimalsLen) {
            event.preventDefault();
            return;
        }
        if (this._sumKeys.includes(key)) {
            this.stepAction(key === 'ArrowDown' ? 'down' : 'up');
            event.preventDefault();
            // let modifiedValue: number = (key !== 'ArrowDown') ? parseFloat((numVal + this._step).toFixed(10)) : parseFloat((numVal - this._step).toFixed(10));
            // this._value = modifiedValue.toString();
            // this.updateChanges();
            return;
        }
    }
    stepAction(action) {
        let { numVal } = this._parsingDataHolder;
        let modifiedValue = action === 'up' ? parseFloat((numVal + this._step).toFixed(10)) : parseFloat((numVal - this._step).toFixed(10));
        this._value = modifiedValue.toString();
        this.updateChanges();
    }
    _parseNumberFieldValue(source = 'controlValue', focusOut = false) {
        let inputFieldVal = this._value;
        let raw = this._value;
        let strVal = (typeof inputFieldVal === 'string') ? inputFieldVal : '';
        if (typeof inputFieldVal === 'number') {
            strVal = inputFieldVal.toString();
        }
        let valLen = strVal.length;
        let hasVal = valLen > 0;
        let isNegativeNr = strVal.startsWith('-');
        let numVal = 0;
        if (hasVal) {
            strVal = strVal.replace('-.', '-0.');
            if (strVal.startsWith('.')) {
                strVal = `0${strVal}`;
            }
            if (strVal !== '.' && strVal !== '-') {
                numVal = (this._wholeNumber) ? parseInt(strVal) : parseFloat(parseFloat(strVal).toFixed((typeof this._maxDecimalsLen === 'number') ? this._maxDecimalsLen : 10));
            }
            else {
                hasVal = false;
            }
        }
        // ? repeats because it might change it's value in previous block
        if (hasVal && !this.__focused) {
            if (typeof this._maxVal === 'number' && numVal > this._maxVal) {
                numVal = this._maxVal;
                strVal = numVal.toString();
            }
            if (typeof this._minVal === 'number' && numVal < this._minVal) {
                numVal = this._minVal;
                strVal = numVal.toString();
            }
        }
        strVal = strVal.replace(',', '.');
        let hasDecimal = strVal.includes('.');
        let decimalsLen = 0;
        if (hasDecimal && !strVal.endsWith('.')) {
            decimalsLen = strVal.split('.')[1].length;
        }
        inputFieldVal = (hasVal) ? strVal : null;
        this._parsingDataHolder = {
            inputFieldVal,
            decimalsLen,
            strVal,
            valLen,
            hasVal,
            hasDecimal,
            isNegativeNr,
            numVal,
            raw
            // numVal: parseFloat(strVal)
        };
    }
    updateChanges(onFocusOut = false) {
        if (onFocusOut) {
            this.__focused = false;
        }
        this._parseNumberFieldValue(undefined, onFocusOut);
        let { strVal, hasVal, numVal } = this._parsingDataHolder;
        // if (onFocusOut && this.mobileNumPad) {
        //   onFocusOut = false;
        // }
        if (!this._initialNumberParse) {
            onFocusOut = true;
            this._initialNumberParse = true;
        }
        this._value = (!onFocusOut) ? strVal : (hasVal) ? numVal : null;
        super.updateChanges();
    }
    registerOnChange(fn) {
        this.onChange = (value) => {
            let { hasVal, numVal } = this._parsingDataHolder;
            fn((hasVal) ? numVal : null);
        };
    }
    onFocus(event) {
        this.__focused = true;
        this._parseAutocompleteData();
        this.onTouched();
    }
    selectChange(val = false) {
        this.__selected = val;
    }
    triggerFocus() {
        this._inputFieldElm.nativeElement.focus();
    }
    preWriteValueHook(value) {
        if (typeof value === 'string') {
            let tempval = value.replace(',', '.');
            if (!isNaN(tempval)) {
                setTimeout(() => {
                    this.updateChanges(true);
                });
            }
        }
    }
    preModelEmitHook() {
        let tempVal = this._value;
        if (typeof tempVal === 'string') {
            tempVal = tempVal.replace(',', '.');
            if (!isNaN(tempVal)) {
                tempVal = parseFloat(tempVal);
            }
        }
        return tempVal;
    }
    stepPressEvent(add = true) {
        this._pressing = true;
        setTimeout(() => {
            if (this._pressInterval) {
                clearInterval(this._pressInterval);
            }
            this._pressInterval = setInterval(() => {
                if (this._pressing) {
                    this.stepAction(add ? 'up' : 'down');
                }
                else {
                    clearInterval(this._pressInterval);
                }
            }, 75);
        }, 500);
    }
    stepPressRelease() {
        this._pressing = false;
    }
    ngOnInit() {
        super.ngOnInit();
    }
    ngOnDestroy() {
        if (this.backDropClick) {
            this.backDropClick.unsubscribe();
        }
        super.ngOnDestroy();
    }
}
HandyNumberInputComponent.ɵfac = function HandyNumberInputComponent_Factory(t) { return new (t || HandyNumberInputComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControl"], 10), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_handy_ng_services__WEBPACK_IMPORTED_MODULE_3__["HandyNgUserService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_handy_form_handy_form_component__WEBPACK_IMPORTED_MODULE_4__["HandyFormComponent"], 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_handy_ng_services__WEBPACK_IMPORTED_MODULE_3__["HandyNgLayoutService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_handy_ng_services__WEBPACK_IMPORTED_MODULE_3__["HandyNgUtilsService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injector"])); };
HandyNumberInputComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: HandyNumberInputComponent, selectors: [["handy-number-input"]], viewQuery: function HandyNumberInputComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstaticViewQuery"](_c0, true, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]);
    } if (rf & 2) {
        var _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._inputFieldElm = _t.first);
    } }, inputs: { appearance: "appearance", label: "label", placeholder: "placeholder", disabled: "disabled", prefixText: "prefixText", sufixText: "sufixText", prefixIcon: "prefixIcon", sufixIcon: "sufixIcon", debounceTime: "debounceTime", startHint: "startHint", endHint: "endHint", fieldName: "fieldName", pinningValue: "pinningValue", disableFieldPin: "disableFieldPin", autocomplete: "autocomplete", simpleAutoCompleteFilter: "simpleAutoCompleteFilter", blur: "blur", color: "color", numericInput: "numericInput", wholeNumber: "wholeNumber", min: "min", max: "max", maxDecimalsLen: "maxDecimalsLen", step: "step", stepBtns: "stepBtns", stepBtnsAlign: "stepBtnsAlign", minusBtnColor: "minusBtnColor", plusBtnColor: "plusBtnColor" }, outputs: { valueChange: "valueChange", statusChange: "statusChange", prefixClick: "prefixClick", sufixClick: "sufixClick", blurEvent: "blur", focusEvent: "focusEvent" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]], decls: 20, vars: 20, consts: [["fxLayout", "", "fxLayoutAlign", "space-between center"], [4, "ngIf"], ["fxFlex", "", 2, "width", "0", 3, "appearance"], ["matInput", "", "type", "text", "inputmode", "decimal", 3, "id", "matAutocomplete", "disabled", "ngModel", "placeholder", "click", "blur", "keydown", "focus", "focusout", "select", "ngModelChange"], ["inputField", "ngModel"], ["matPrefix", "", 3, "size", "icon", "click", 4, "ngIf"], ["matSuffix", "", 3, "size", "icon", "click", 4, "ngIf"], ["mat-icon-button", "", "matSuffix", "", 3, "click", 4, "ngIf"], ["matPrefix", "", 3, "click", 4, "ngIf"], ["matSuffix", "", 3, "click", 4, "ngIf"], ["matSuffix", "", "color", "primary", "mode", "indeterminate", 3, "diameter", 4, "ngIf"], ["align", "start", 4, "ngIf"], ["align", "end", 4, "ngIf"], [3, "matTooltip", 4, "ngIf"], ["auto", "matAutocomplete"], ["icon", "remove_circle_outline", 3, "color", "disabled", "click", "press", "pressup"], ["icon", "add_circle_outline", 3, "color", "disabled", "press", "pressup", "click"], ["icon", "remove_circle_outline", 3, "color", "disabled", "press", "pressup", "click"], ["matPrefix", "", 3, "size", "icon", "click"], ["matSuffix", "", 3, "size", "icon", "click"], ["mat-icon-button", "", "matSuffix", "", 3, "click"], [3, "size", "icon"], ["matPrefix", "", 3, "click"], ["matSuffix", "", 3, "click"], ["matSuffix", "", "color", "primary", "mode", "indeterminate", 3, "diameter"], ["align", "start"], ["align", "end"], [3, "matTooltip"], [3, "value", "onSelectionChange", 4, "ngFor", "ngForOf"], [3, "value", "onSelectionChange"], [3, "label", 4, "ngFor", "ngForOf"], [3, "label"]], template: function HandyNumberInputComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, HandyNumberInputComponent_ng_container_1_Template, 3, 2, "ng-container", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "mat-form-field", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, HandyNumberInputComponent_mat_label_3_Template, 2, 1, "mat-label", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "input", 3, 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HandyNumberInputComponent_Template_input_click_4_listener() { return ctx.selectChange(); })("blur", function HandyNumberInputComponent_Template_input_blur_4_listener() { return ctx.selectChange(); })("keydown", function HandyNumberInputComponent_Template_input_keydown_4_listener($event) { return ctx.preventWrongKeys($event); })("keydown", function HandyNumberInputComponent_Template_input_keydown_4_listener() { return ctx.selectChange(); })("focus", function HandyNumberInputComponent_Template_input_focus_4_listener($event) { return ctx.onFocus($event); })("focus", function HandyNumberInputComponent_Template_input_focus_4_listener() { return ctx.focusEvent.next(); })("focusout", function HandyNumberInputComponent_Template_input_focusout_4_listener() { return ctx.updateChanges(true); })("select", function HandyNumberInputComponent_Template_input_select_4_listener() { return ctx.selectChange(true); })("ngModelChange", function HandyNumberInputComponent_Template_input_ngModelChange_4_listener($event) { return ctx._value = $event; })("ngModelChange", function HandyNumberInputComponent_Template_input_ngModelChange_4_listener() { return ctx.updateChanges(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, HandyNumberInputComponent_handy_icon_6_Template, 1, 2, "handy-icon", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, HandyNumberInputComponent_handy_icon_7_Template, 1, 2, "handy-icon", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](8, HandyNumberInputComponent_button_8_Template, 2, 2, "button", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, HandyNumberInputComponent_span_9_Template, 2, 1, "span", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](10, HandyNumberInputComponent_span_10_Template, 2, 1, "span", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, HandyNumberInputComponent_mat_progress_spinner_11_Template, 1, 1, "mat-progress-spinner", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](12, HandyNumberInputComponent_mat_hint_12_Template, 2, 1, "mat-hint", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](13, HandyNumberInputComponent_mat_hint_13_Template, 2, 1, "mat-hint", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](14, HandyNumberInputComponent_mat_error_14_Template, 3, 4, "mat-error", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "mat-autocomplete", null, 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](17, HandyNumberInputComponent_div_17_Template, 3, 3, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](18, HandyNumberInputComponent_div_18_Template, 3, 3, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](19, HandyNumberInputComponent_ng_container_19_Template, 3, 2, "ng-container", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._stepBtns);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("appearance", ctx._appearance);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._label);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("id", ctx.randInputId)("matAutocomplete", _r12)("disabled", ctx._isDisabled)("ngModel", ctx._value)("placeholder", ctx._placeholder);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._prefixIcon && ctx._fieldStatus !== "PENDING" && !ctx._pinningState);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._sufixIcon && ctx._fieldStatus !== "PENDING" && !ctx._pinningState);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._handyNgUserService.loggedInStatus && ctx._pinningState && !ctx._disableFieldPin);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._prefixText && ctx._fieldStatus !== "PENDING" && !ctx._pinningState);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._sufixText && ctx._fieldStatus !== "PENDING" && !ctx._pinningState);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._fieldStatus === "PENDING" && !ctx._pinningState);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._startHint);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._endHint);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._fieldErr);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._hasAutocomplete && ctx._autocompleteType === "simple");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._hasAutocomplete && ctx._autocompleteType === "group");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._stepBtns);
    } }, directives: [_angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_5__["DefaultLayoutDirective"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_5__["DefaultLayoutAlignDirective"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["NgIf"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__["MatFormField"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_5__["DefaultFlexDirective"], _angular_material_input__WEBPACK_IMPORTED_MODULE_8__["MatInput"], _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_9__["MatAutocompleteTrigger"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgModel"], _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_9__["MatAutocomplete"], _modules_shared_components_buttons_icon_btn_icon_btn_component__WEBPACK_IMPORTED_MODULE_10__["IconBtnComponent"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__["MatLabel"], _modules_shared_components_handy_icon_handy_icon_component__WEBPACK_IMPORTED_MODULE_11__["HandyIconComponent"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__["MatPrefix"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__["MatSuffix"], _angular_material_button__WEBPACK_IMPORTED_MODULE_12__["MatButton"], _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_13__["MatProgressSpinner"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__["MatHint"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__["MatError"], _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_14__["MatTooltip"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["NgForOf"], _angular_material_core__WEBPACK_IMPORTED_MODULE_15__["MatOption"], _angular_material_core__WEBPACK_IMPORTED_MODULE_15__["MatOptgroup"]], pipes: [_handy_ng_pipes_truncate_pipe__WEBPACK_IMPORTED_MODULE_16__["TruncatePipe"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["AsyncPipe"]], styles: ["[_nghost-%COMP%] {\n  display: block;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvaGFuZHkvbW9kdWxlcy9oYW5keS1mb3JtL2NvbXBvbmVudHMvaGFuZHktbnVtYmVyLWlucHV0L2hhbmR5LW51bWJlci1pbnB1dC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQztFQUNFLGNBQUE7QUFDSCIsImZpbGUiOiJzcmMvYXBwL2hhbmR5L21vZHVsZXMvaGFuZHktZm9ybS9jb21wb25lbnRzL2hhbmR5LW51bWJlci1pbnB1dC9oYW5keS1udW1iZXItaW5wdXQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIgOmhvc3Qge1xyXG4gICBkaXNwbGF5OiBibG9jaztcclxuIH0iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](HandyNumberInputComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'handy-number-input',
                templateUrl: './handy-number-input.component.html',
                styleUrls: ['./handy-number-input.component.scss'],
                inputs: [
                    'appearance', 'label', 'placeholder', 'disabled',
                    'prefixText', 'sufixText', 'prefixIcon',
                    'sufixIcon',
                    'debounceTime', 'startHint', 'endHint', 'fieldName',
                    'pinningValue', 'disableFieldPin', 'autocomplete', 'simpleAutoCompleteFilter',
                    'blur', 'color'
                ],
                outputs: [
                    'valueChange', 'statusChange', 'prefixClick', 'sufixClick'
                ]
            }]
    }], function () { return [{ type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControl"], decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
            }, {
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Self"]
            }] }, { type: _handy_ng_services__WEBPACK_IMPORTED_MODULE_3__["HandyNgUserService"] }, { type: _handy_form_handy_form_component__WEBPACK_IMPORTED_MODULE_4__["HandyFormComponent"], decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
            }] }, { type: _handy_ng_services__WEBPACK_IMPORTED_MODULE_3__["HandyNgLayoutService"] }, { type: _handy_ng_services__WEBPACK_IMPORTED_MODULE_3__["HandyNgUtilsService"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injector"] }]; }, { blurEvent: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"],
            args: ['blur']
        }], focusEvent: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"],
            args: ['focusEvent']
        }], _inputFieldElm: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: ['inputField', { static: true, read: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"] }]
        }], numericInput: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], wholeNumber: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], min: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], max: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], maxDecimalsLen: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], step: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], stepBtns: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], stepBtnsAlign: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], minusBtnColor: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], plusBtnColor: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }] }); })();


/***/ }),

/***/ "./src/app/handy/modules/handy-form/components/handy-password-input/handy-password-input.component.ts":
/*!************************************************************************************************************!*\
  !*** ./src/app/handy/modules/handy-form/components/handy-password-input/handy-password-input.component.ts ***!
  \************************************************************************************************************/
/*! exports provided: HandyPasswordInputComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HandyPasswordInputComponent", function() { return HandyPasswordInputComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _handy_ng_extenders_handy_form_contol__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @handy-ng/extenders/handy-form-contol */ "./src/app/handy/extenders/handy-form-contol.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _handy_ng_services__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @handy-ng/services */ "./src/app/handy/services/index.ts");
/* harmony import */ var _handy_form_handy_form_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../handy-form/handy-form.component */ "./src/app/handy/modules/handy-form/components/handy-form/handy-form.component.ts");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/form-field */ "./node_modules/@angular/material/fesm2015/form-field.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/input */ "./node_modules/@angular/material/fesm2015/input.js");
/* harmony import */ var _modules_shared_components_handy_icon_handy_icon_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../../modules/shared/components/handy-icon/handy-icon.component */ "./src/app/modules/shared/components/handy-icon/handy-icon.component.ts");
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/tooltip */ "./node_modules/@angular/material/fesm2015/tooltip.js");
/* harmony import */ var _handy_ng_pipes_truncate_pipe__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @handy-ng/pipes/truncate.pipe */ "./src/app/handy/pipes/truncate.pipe.ts");












function HandyPasswordInputComponent_mat_label_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r0._label);
} }
function HandyPasswordInputComponent_handy_icon_4_Template(rf, ctx) { if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "handy-icon", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HandyPasswordInputComponent_handy_icon_4_Template_handy_icon_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r8); const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r7.triggerPrefixClick(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("size", ctx_r2._prefixAndSufixIconSize)("icon", ctx_r2._prefixIcon);
} }
function HandyPasswordInputComponent_span_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r3._prefixText);
} }
function HandyPasswordInputComponent_mat_hint_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-hint", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r4._startHint);
} }
function HandyPasswordInputComponent_mat_hint_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-hint", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r5._endHint);
} }
function HandyPasswordInputComponent_mat_error_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-error", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "truncate");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matTooltip", ctx_r6._fieldErr);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](2, 2, ctx_r6._fieldErr));
} }
class HandyPasswordInputComponent extends _handy_ng_extenders_handy_form_contol__WEBPACK_IMPORTED_MODULE_1__["HandyFormControl"] {
    constructor(ngControl, _handyNgUserService, _parentFormComponent, _handyNgUtilsService) {
        super(ngControl, _handyNgUserService, _parentFormComponent);
        this.ngControl = ngControl;
        this._handyNgUserService = _handyNgUserService;
        this._parentFormComponent = _parentFormComponent;
        this._handyNgUtilsService = _handyNgUtilsService;
        this.visible = false;
        this.passwordStrength = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.disableFieldPin = true;
        this.disableFieldStateMemory = true;
    }
    ngOnInit() {
        super.ngOnInit();
    }
    updateChanges() {
        super.updateChanges();
        this.passwordStrength.emit(this._handyNgUtilsService.getPasswordStrength(this._value));
    }
    ngOnDestroy() {
        super.ngOnDestroy();
    }
}
HandyPasswordInputComponent.ɵfac = function HandyPasswordInputComponent_Factory(t) { return new (t || HandyPasswordInputComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControl"], 10), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_handy_ng_services__WEBPACK_IMPORTED_MODULE_3__["HandyNgUserService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_handy_form_handy_form_component__WEBPACK_IMPORTED_MODULE_4__["HandyFormComponent"], 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_handy_ng_services__WEBPACK_IMPORTED_MODULE_3__["HandyNgUtilsService"])); };
HandyPasswordInputComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: HandyPasswordInputComponent, selectors: [["handy-password-input"]], inputs: { appearance: "appearance", label: "label", placeholder: "placeholder", disabled: "disabled", sufixIcon: "sufixIcon", debounceTime: "debounceTime", startHint: "startHint", endHint: "endHint", autofill: "autofill" }, outputs: { valueChange: "valueChange", statusChange: "statusChange", prefixClick: "prefixClick", passwordStrength: "passwordStrength" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]], decls: 10, vars: 15, consts: [[3, "appearance"], [4, "ngIf"], ["matInput", "", 3, "disabled", "ngModel", "type", "placeholder", "autocomplete", "ngModelChange", "focus"], ["inputField", "ngModel"], ["matPrefix", "", 3, "size", "icon", "click", 4, "ngIf"], ["matSuffix", "", 3, "size", "icon", "matTooltip", "click"], ["matPrefix", "", 4, "ngIf"], ["align", "start", 4, "ngIf"], ["align", "end", 4, "ngIf"], [3, "matTooltip", 4, "ngIf"], ["matPrefix", "", 3, "size", "icon", "click"], ["matPrefix", ""], ["align", "start"], ["align", "end"], [3, "matTooltip"]], template: function HandyPasswordInputComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-form-field", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, HandyPasswordInputComponent_mat_label_1_Template, 2, 1, "mat-label", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "input", 2, 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function HandyPasswordInputComponent_Template_input_ngModelChange_2_listener($event) { return ctx._value = $event; })("ngModelChange", function HandyPasswordInputComponent_Template_input_ngModelChange_2_listener() { return ctx.updateChanges(); })("focus", function HandyPasswordInputComponent_Template_input_focus_2_listener() { return ctx.onTouched(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, HandyPasswordInputComponent_handy_icon_4_Template, 1, 2, "handy-icon", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "handy-icon", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HandyPasswordInputComponent_Template_handy_icon_click_5_listener() { return ctx.visible = !ctx.visible; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, HandyPasswordInputComponent_span_6_Template, 2, 1, "span", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, HandyPasswordInputComponent_mat_hint_7_Template, 2, 1, "mat-hint", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](8, HandyPasswordInputComponent_mat_hint_8_Template, 2, 1, "mat-hint", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, HandyPasswordInputComponent_mat_error_9_Template, 3, 4, "mat-error", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("appearance", ctx._appearance);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._label);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", ctx._isDisabled)("ngModel", ctx._value)("type", ctx.visible ? "text" : "password")("placeholder", ctx._placeholder)("autocomplete", ctx.autofill ? ctx.fieldName : "new-password");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._prefixIcon && ctx._fieldStatus !== "PENDING" && !ctx._pinningState);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("size", ctx._prefixAndSufixIconSize)("icon", ctx.visible ? "visibility" : "visibility_off")("matTooltip", ctx.visible ? "Hide password" : "Show password");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._prefixText && ctx._fieldStatus !== "PENDING" && !ctx._pinningState);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._startHint);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._endHint);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._fieldErr);
    } }, directives: [_angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__["MatFormField"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["NgIf"], _angular_material_input__WEBPACK_IMPORTED_MODULE_7__["MatInput"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgModel"], _modules_shared_components_handy_icon_handy_icon_component__WEBPACK_IMPORTED_MODULE_8__["HandyIconComponent"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__["MatSuffix"], _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_9__["MatTooltip"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__["MatLabel"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__["MatPrefix"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__["MatHint"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__["MatError"]], pipes: [_handy_ng_pipes_truncate_pipe__WEBPACK_IMPORTED_MODULE_10__["TruncatePipe"]], styles: ["[_nghost-%COMP%] {\n  display: block;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvaGFuZHkvbW9kdWxlcy9oYW5keS1mb3JtL2NvbXBvbmVudHMvaGFuZHktcGFzc3dvcmQtaW5wdXQvaGFuZHktcGFzc3dvcmQtaW5wdXQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUM7RUFDRSxjQUFBO0FBQ0giLCJmaWxlIjoic3JjL2FwcC9oYW5keS9tb2R1bGVzL2hhbmR5LWZvcm0vY29tcG9uZW50cy9oYW5keS1wYXNzd29yZC1pbnB1dC9oYW5keS1wYXNzd29yZC1pbnB1dC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIiA6aG9zdCB7XHJcbiAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gfSJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](HandyPasswordInputComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'handy-password-input',
                templateUrl: './handy-password-input.component.html',
                styleUrls: ['./handy-password-input.component.scss'],
                inputs: [
                    'appearance', 'label', 'placeholder', 'disabled',
                    'sufixIcon', 'debounceTime', 'startHint', 'endHint',
                    'autofill'
                ],
                outputs: [
                    'valueChange', 'statusChange', 'prefixClick', 'passwordStrength'
                ]
            }]
    }], function () { return [{ type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControl"], decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
            }, {
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Self"]
            }] }, { type: _handy_ng_services__WEBPACK_IMPORTED_MODULE_3__["HandyNgUserService"] }, { type: _handy_form_handy_form_component__WEBPACK_IMPORTED_MODULE_4__["HandyFormComponent"], decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
            }] }, { type: _handy_ng_services__WEBPACK_IMPORTED_MODULE_3__["HandyNgUtilsService"] }]; }, { autofill: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
            args: ['autofill']
        }], passwordStrength: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"],
            args: ['passwordStrength']
        }] }); })();


/***/ }),

/***/ "./src/app/handy/modules/handy-form/components/handy-rte-input/handy-rte-input.component.ts":
/*!**************************************************************************************************!*\
  !*** ./src/app/handy/modules/handy-form/components/handy-rte-input/handy-rte-input.component.ts ***!
  \**************************************************************************************************/
/*! exports provided: HandyRteInputComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HandyRteInputComponent", function() { return HandyRteInputComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _handy_ng_extenders_handy_form_contol__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @handy-ng/extenders/handy-form-contol */ "./src/app/handy/extenders/handy-form-contol.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _handy_ng_services__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @handy-ng/services */ "./src/app/handy/services/index.ts");
/* harmony import */ var _handy_form_handy_form_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../handy-form/handy-form.component */ "./src/app/handy/modules/handy-form/components/handy-form/handy-form.component.ts");
/* harmony import */ var _handy_ng_directives_is_browser_directive__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @handy-ng/directives/is-browser.directive */ "./src/app/handy/directives/is-browser.directive.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _handy_ng_directives_is_server_directive__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @handy-ng/directives/is-server.directive */ "./src/app/handy/directives/is-server.directive.ts");
/* harmony import */ var ngx_quill__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-quill */ "./node_modules/ngx-quill/fesm2015/ngx-quill.js");
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/progress-spinner */ "./node_modules/@angular/material/fesm2015/progress-spinner.js");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/form-field */ "./node_modules/@angular/material/fesm2015/form-field.js");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/fesm2015/button.js");
/* harmony import */ var _modules_shared_components_handy_icon_handy_icon_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../../modules/shared/components/handy-icon/handy-icon.component */ "./src/app/modules/shared/components/handy-icon/handy-icon.component.ts");
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/tooltip */ "./node_modules/@angular/material/fesm2015/tooltip.js");
/* harmony import */ var _handy_ng_pipes_truncate_pipe__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @handy-ng/pipes/truncate.pipe */ "./src/app/handy/pipes/truncate.pipe.ts");
















function HandyRteInputComponent_quill_editor_1_Template(rf, ctx) { if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "quill-editor", 7, 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function HandyRteInputComponent_quill_editor_1_Template_quill_editor_ngModelChange_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r8); const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r7.updateChanges(); })("ngModelChange", function HandyRteInputComponent_quill_editor_1_Template_quill_editor_ngModelChange_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r8); const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r9._value = $event; })("onFocus", function HandyRteInputComponent_quill_editor_1_Template_quill_editor_onFocus_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r8); const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r10.onTouched(); })("onBlur", function HandyRteInputComponent_quill_editor_1_Template_quill_editor_onBlur_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r8); const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r11.onTouched(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx_r0._value)("modules", ctx_r0.quillModules)("disabled", ctx_r0._isDisabled)("sanitize", true)("placeholder", ctx_r0._placeholder);
} }
function HandyRteInputComponent_mat_progress_spinner_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "mat-progress-spinner", 9);
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("diameter", 16);
} }
function HandyRteInputComponent_button_3_Template(rf, ctx) { if (rf & 1) {
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HandyRteInputComponent_button_3_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r13); const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r12.handlePinClick(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "handy-icon", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("size", 16)("icon", ctx_r2._hasPinnedVal ? "lock" : "lock_open");
} }
function HandyRteInputComponent_mat_error_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-error", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "truncate");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matTooltip", ctx_r3._fieldErr);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](2, 2, ctx_r3._fieldErr));
} }
function HandyRteInputComponent_quill_view_html_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "quill-view-html", 13);
} if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("content", ctx_r4._value);
} }
function HandyRteInputComponent_input_6_Template(rf, ctx) { if (rf & 1) {
    const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "input", 14, 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function HandyRteInputComponent_input_6_Template_input_ngModelChange_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r16); const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r15._value = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", ctx_r5._isDisabled)("ngModel", ctx_r5._value)("type", "hidden")("placeholder", ctx_r5._placeholder);
} }
// import * as Quill from 'quill';
// var icons = Quill.import('ui/icons');
// icons['bold'] = '<i class="fa fa-bold" aria-hidden="true"></i>';
class HandyRteInputComponent extends _handy_ng_extenders_handy_form_contol__WEBPACK_IMPORTED_MODULE_1__["HandyFormControl"] {
    constructor(ngControl, _handyNgUserService, _parentFormComponent) {
        super(ngControl, _handyNgUserService, _parentFormComponent);
        this.ngControl = ngControl;
        this._handyNgUserService = _handyNgUserService;
        this._parentFormComponent = _parentFormComponent;
        this.quillModules = {
            'toolbar': [
                ['bold', 'italic', 'underline', 'strike'],
                ['blockquote', 'code-block'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                [{ 'script': 'sub' }, { 'script': 'super' }],
                [{ 'indent': '-1' }, { 'indent': '+1' }],
                [{ 'direction': 'rtl' }],
                [{ 'header': [1, 2, 3, false] }],
                [{ 'color': [] }, { 'background': [] }],
                [{ 'align': [] }],
                ['clean'],
                ['link'],
            ],
        };
    }
    ngOnInit() {
        super.ngOnInit();
    }
    ngOnDestroy() {
        super.ngOnDestroy();
    }
}
HandyRteInputComponent.ɵfac = function HandyRteInputComponent_Factory(t) { return new (t || HandyRteInputComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControl"], 10), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_handy_ng_services__WEBPACK_IMPORTED_MODULE_3__["HandyNgUserService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_handy_form_handy_form_component__WEBPACK_IMPORTED_MODULE_4__["HandyFormComponent"], 8)); };
HandyRteInputComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: HandyRteInputComponent, selectors: [["handy-rte-input"]], inputs: { placeholder: "placeholder", disabled: "disabled", debounceTime: "debounceTime", fieldName: "fieldName", pinningValue: "pinningValue", disableFieldPin: "disableFieldPin" }, outputs: { valueChange: "valueChange", statusChange: "statusChange" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]], decls: 7, vars: 3, consts: [[1, "quill-editor-handy-section"], ["class", "mat-typography", 3, "ngModel", "modules", "disabled", "sanitize", "placeholder", "ngModelChange", "onFocus", "onBlur", 4, "browser"], ["matSuffix", "", "color", "primary", "mode", "indeterminate", 3, "diameter", 4, "ngIf"], ["mat-icon-button", "", "matSuffix", "", 3, "click", 4, "ngIf"], [3, "matTooltip", 4, "ngIf"], [3, "content", 4, "server"], [3, "disabled", "ngModel", "type", "placeholder", "ngModelChange", 4, "server"], [1, "mat-typography", 3, "ngModel", "modules", "disabled", "sanitize", "placeholder", "ngModelChange", "onFocus", "onBlur"], ["inputField", "ngModel"], ["matSuffix", "", "color", "primary", "mode", "indeterminate", 3, "diameter"], ["mat-icon-button", "", "matSuffix", "", 3, "click"], [3, "size", "icon"], [3, "matTooltip"], [3, "content"], [3, "disabled", "ngModel", "type", "placeholder", "ngModelChange"]], template: function HandyRteInputComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, HandyRteInputComponent_quill_editor_1_Template, 2, 5, "quill-editor", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, HandyRteInputComponent_mat_progress_spinner_2_Template, 1, 1, "mat-progress-spinner", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, HandyRteInputComponent_button_3_Template, 2, 2, "button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, HandyRteInputComponent_mat_error_4_Template, 3, 4, "mat-error", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, HandyRteInputComponent_quill_view_html_5_Template, 1, 1, "quill-view-html", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, HandyRteInputComponent_input_6_Template, 2, 4, "input", 6);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._fieldStatus === "PENDING" && !ctx._pinningState);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._handyNgUserService.loggedInStatus && ctx._pinningState && !ctx._disableFieldPin);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._fieldErr);
    } }, directives: [_handy_ng_directives_is_browser_directive__WEBPACK_IMPORTED_MODULE_5__["IsBrowserDirective"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["NgIf"], _handy_ng_directives_is_server_directive__WEBPACK_IMPORTED_MODULE_7__["IsServerDirective"], ngx_quill__WEBPACK_IMPORTED_MODULE_8__["QuillEditorComponent"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgModel"], _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_9__["MatProgressSpinner"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_10__["MatSuffix"], _angular_material_button__WEBPACK_IMPORTED_MODULE_11__["MatButton"], _modules_shared_components_handy_icon_handy_icon_component__WEBPACK_IMPORTED_MODULE_12__["HandyIconComponent"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_10__["MatError"], _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_13__["MatTooltip"], ngx_quill__WEBPACK_IMPORTED_MODULE_8__["QuillViewHTMLComponent"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["DefaultValueAccessor"]], pipes: [_handy_ng_pipes_truncate_pipe__WEBPACK_IMPORTED_MODULE_14__["TruncatePipe"]], styles: ["[_nghost-%COMP%] {\n  display: block;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvaGFuZHkvbW9kdWxlcy9oYW5keS1mb3JtL2NvbXBvbmVudHMvaGFuZHktcnRlLWlucHV0L2hhbmR5LXJ0ZS1pbnB1dC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGNBQUE7QUFDRiIsImZpbGUiOiJzcmMvYXBwL2hhbmR5L21vZHVsZXMvaGFuZHktZm9ybS9jb21wb25lbnRzL2hhbmR5LXJ0ZS1pbnB1dC9oYW5keS1ydGUtaW5wdXQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdCB7XHJcbiAgZGlzcGxheTogYmxvY2s7XHJcbn1cclxuIl19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](HandyRteInputComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'handy-rte-input',
                templateUrl: './handy-rte-input.component.html',
                styleUrls: ['./handy-rte-input.component.scss'],
                inputs: [
                    'placeholder', 'disabled',
                    'debounceTime', 'fieldName',
                    'pinningValue', 'disableFieldPin',
                ],
                outputs: [
                    'valueChange', 'statusChange'
                ]
            }]
    }], function () { return [{ type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControl"], decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
            }, {
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Self"]
            }] }, { type: _handy_ng_services__WEBPACK_IMPORTED_MODULE_3__["HandyNgUserService"] }, { type: _handy_form_handy_form_component__WEBPACK_IMPORTED_MODULE_4__["HandyFormComponent"], decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
            }] }]; }, null); })();


/***/ }),

/***/ "./src/app/handy/modules/handy-form/components/handy-select-input/handy-select-input.component.ts":
/*!********************************************************************************************************!*\
  !*** ./src/app/handy/modules/handy-form/components/handy-select-input/handy-select-input.component.ts ***!
  \********************************************************************************************************/
/*! exports provided: HandySelectInputComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HandySelectInputComponent", function() { return HandySelectInputComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _handy_ng_extenders_handy_form_contol__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @handy-ng/extenders/handy-form-contol */ "./src/app/handy/extenders/handy-form-contol.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _handy_ng_services__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @handy-ng/services */ "./src/app/handy/services/index.ts");
/* harmony import */ var _handy_form_handy_form_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../handy-form/handy-form.component */ "./src/app/handy/modules/handy-form/components/handy-form/handy-form.component.ts");
/* harmony import */ var _handy_ng_directives_is_desktop_directive__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @handy-ng/directives/is-desktop.directive */ "./src/app/handy/directives/is-desktop.directive.ts");
/* harmony import */ var _handy_ng_directives_is_mobile_directive__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @handy-ng/directives/is-mobile.directive */ "./src/app/handy/directives/is-mobile.directive.ts");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/form-field */ "./node_modules/@angular/material/fesm2015/form-field.js");
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/select */ "./node_modules/@angular/material/fesm2015/select.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/core */ "./node_modules/@angular/material/fesm2015/core.js");
/* harmony import */ var _modules_shared_components_handy_icon_handy_icon_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../../modules/shared/components/handy-icon/handy-icon.component */ "./src/app/modules/shared/components/handy-icon/handy-icon.component.ts");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/fesm2015/button.js");
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/progress-spinner */ "./node_modules/@angular/material/fesm2015/progress-spinner.js");
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/tooltip */ "./node_modules/@angular/material/fesm2015/tooltip.js");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/input */ "./node_modules/@angular/material/fesm2015/input.js");
/* harmony import */ var _handy_ng_pipes_truncate_pipe__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @handy-ng/pipes/truncate.pipe */ "./src/app/handy/pipes/truncate.pipe.ts");


















const _c0 = ["inputField"];
function HandySelectInputComponent_mat_form_field_0_ng_container_5_mat_option_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-option", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const option_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", option_r13["value"])("disabled", option_r13.disabled);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", option_r13["displayValue"], " ");
} }
function HandySelectInputComponent_mat_form_field_0_ng_container_5_mat_optgroup_2_mat_option_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-option", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const childOption_r18 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", childOption_r18["value"])("disabled", childOption_r18.disabled);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", childOption_r18["displayValue"], " ");
} }
function HandySelectInputComponent_mat_form_field_0_ng_container_5_mat_optgroup_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-optgroup", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, HandySelectInputComponent_mat_form_field_0_ng_container_5_mat_optgroup_2_mat_option_1_Template, 2, 3, "mat-option", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const option_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("label", option_r13["label"])("disabled", option_r13.disabled);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", option_r13["options"]);
} }
function HandySelectInputComponent_mat_form_field_0_ng_container_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, HandySelectInputComponent_mat_form_field_0_ng_container_5_mat_option_1_Template, 2, 3, "mat-option", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, HandySelectInputComponent_mat_form_field_0_ng_container_5_mat_optgroup_2_Template, 2, 3, "mat-optgroup", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const option_r13 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !option_r13["label"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", option_r13["label"]);
} }
function HandySelectInputComponent_mat_form_field_0_handy_icon_6_Template(rf, ctx) { if (rf & 1) {
    const _r21 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "handy-icon", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HandySelectInputComponent_mat_form_field_0_handy_icon_6_Template_handy_icon_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r21); const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r20.triggerPrefixClick(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("size", ctx_r4._prefixAndSufixIconSize)("icon", ctx_r4._prefixIcon);
} }
function HandySelectInputComponent_mat_form_field_0_handy_icon_7_Template(rf, ctx) { if (rf & 1) {
    const _r23 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "handy-icon", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HandySelectInputComponent_mat_form_field_0_handy_icon_7_Template_handy_icon_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r23); const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r22.triggerSufixClick(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("size", ctx_r5._prefixAndSufixIconSize)("icon", ctx_r5._sufixIcon);
} }
function HandySelectInputComponent_mat_form_field_0_button_8_Template(rf, ctx) { if (rf & 1) {
    const _r25 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HandySelectInputComponent_mat_form_field_0_button_8_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r25); const ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r24.handlePinClick(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "handy-icon", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("size", 16)("icon", ctx_r6._hasPinnedVal ? "lock" : "lock_open");
} }
function HandySelectInputComponent_mat_form_field_0_span_9_Template(rf, ctx) { if (rf & 1) {
    const _r27 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HandySelectInputComponent_mat_form_field_0_span_9_Template_span_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r27); const ctx_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r26.triggerPrefixClick(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r7._prefixText);
} }
function HandySelectInputComponent_mat_form_field_0_span_10_Template(rf, ctx) { if (rf & 1) {
    const _r29 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HandySelectInputComponent_mat_form_field_0_span_10_Template_span_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r29); const ctx_r28 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r28.triggerSufixClick(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r8._sufixText);
} }
function HandySelectInputComponent_mat_form_field_0_mat_progress_spinner_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "mat-progress-spinner", 26);
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("diameter", 16);
} }
function HandySelectInputComponent_mat_form_field_0_mat_hint_12_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-hint", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r10._startHint);
} }
function HandySelectInputComponent_mat_form_field_0_mat_hint_13_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-hint", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r11._endHint);
} }
function HandySelectInputComponent_mat_form_field_0_mat_error_14_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-error", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "truncate");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matTooltip", ctx_r12._fieldErr);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](2, 2, ctx_r12._fieldErr));
} }
function HandySelectInputComponent_mat_form_field_0_Template(rf, ctx) { if (rf & 1) {
    const _r31 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-form-field", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "mat-select", 3, 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function HandySelectInputComponent_mat_form_field_0_Template_mat_select_ngModelChange_3_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r31); const ctx_r30 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r30._value = $event; })("ngModelChange", function HandySelectInputComponent_mat_form_field_0_Template_mat_select_ngModelChange_3_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r31); const ctx_r32 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r32.updateChanges(); })("focus", function HandySelectInputComponent_mat_form_field_0_Template_mat_select_focus_3_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r31); const ctx_r33 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r33.onTouched(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, HandySelectInputComponent_mat_form_field_0_ng_container_5_Template, 3, 2, "ng-container", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, HandySelectInputComponent_mat_form_field_0_handy_icon_6_Template, 1, 2, "handy-icon", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, HandySelectInputComponent_mat_form_field_0_handy_icon_7_Template, 1, 2, "handy-icon", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](8, HandySelectInputComponent_mat_form_field_0_button_8_Template, 2, 2, "button", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, HandySelectInputComponent_mat_form_field_0_span_9_Template, 2, 1, "span", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](10, HandySelectInputComponent_mat_form_field_0_span_10_Template, 2, 1, "span", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, HandySelectInputComponent_mat_form_field_0_mat_progress_spinner_11_Template, 1, 1, "mat-progress-spinner", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](12, HandySelectInputComponent_mat_form_field_0_mat_hint_12_Template, 2, 1, "mat-hint", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](13, HandySelectInputComponent_mat_form_field_0_mat_hint_13_Template, 2, 1, "mat-hint", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](14, HandySelectInputComponent_mat_form_field_0_mat_error_14_Template, 3, 4, "mat-error", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("appearance", ctx_r0._appearance);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r0._label);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx_r0._value)("disabled", ctx_r0._isDisabled);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r0._options);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r0._prefixIcon && ctx_r0._fieldStatus !== "PENDING" && !ctx_r0._pinningState);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r0._sufixIcon && ctx_r0._fieldStatus !== "PENDING" && !ctx_r0._pinningState);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r0._handyNgUserService.loggedInStatus && ctx_r0._pinningState && !ctx_r0._disableFieldPin);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r0._prefixText && ctx_r0._fieldStatus !== "PENDING" && !ctx_r0._pinningState);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r0._sufixText && ctx_r0._fieldStatus !== "PENDING" && !ctx_r0._pinningState);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r0._fieldStatus === "PENDING" && !ctx_r0._pinningState);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r0._startHint);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r0._endHint);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r0._fieldErr);
} }
function HandySelectInputComponent_mat_form_field_1_ng_container_5_option_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "option", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const option_r45 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngValue", option_r45["value"])("disabled", option_r45.disabled);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", option_r45["displayValue"], " ");
} }
function HandySelectInputComponent_mat_form_field_1_ng_container_5_optgroup_2_option_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "option", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const childOption_r50 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngValue", childOption_r50["value"])("disabled", childOption_r50.disabled);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", childOption_r50["displayValue"], " ");
} }
function HandySelectInputComponent_mat_form_field_1_ng_container_5_optgroup_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "optgroup", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, HandySelectInputComponent_mat_form_field_1_ng_container_5_optgroup_2_option_1_Template, 2, 3, "option", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const option_r45 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("label", option_r45["label"])("disabled", option_r45.disabled);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", option_r45["options"]);
} }
function HandySelectInputComponent_mat_form_field_1_ng_container_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, HandySelectInputComponent_mat_form_field_1_ng_container_5_option_1_Template, 2, 3, "option", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, HandySelectInputComponent_mat_form_field_1_ng_container_5_optgroup_2_Template, 2, 3, "optgroup", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const option_r45 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !option_r45["label"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", option_r45["label"]);
} }
function HandySelectInputComponent_mat_form_field_1_handy_icon_6_Template(rf, ctx) { if (rf & 1) {
    const _r53 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "handy-icon", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HandySelectInputComponent_mat_form_field_1_handy_icon_6_Template_handy_icon_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r53); const ctx_r52 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r52.triggerPrefixClick(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r36 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("size", ctx_r36._prefixAndSufixIconSize)("icon", ctx_r36._prefixIcon);
} }
function HandySelectInputComponent_mat_form_field_1_handy_icon_7_Template(rf, ctx) { if (rf & 1) {
    const _r55 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "handy-icon", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HandySelectInputComponent_mat_form_field_1_handy_icon_7_Template_handy_icon_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r55); const ctx_r54 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r54.triggerSufixClick(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r37 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("size", ctx_r37._prefixAndSufixIconSize)("icon", ctx_r37._sufixIcon);
} }
function HandySelectInputComponent_mat_form_field_1_button_8_Template(rf, ctx) { if (rf & 1) {
    const _r57 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HandySelectInputComponent_mat_form_field_1_button_8_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r57); const ctx_r56 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r56.handlePinClick(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "handy-icon", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r38 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("size", 16)("icon", ctx_r38._hasPinnedVal ? "lock" : "lock_open");
} }
function HandySelectInputComponent_mat_form_field_1_span_9_Template(rf, ctx) { if (rf & 1) {
    const _r59 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HandySelectInputComponent_mat_form_field_1_span_9_Template_span_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r59); const ctx_r58 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r58.triggerPrefixClick(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r39 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r39._prefixText);
} }
function HandySelectInputComponent_mat_form_field_1_span_10_Template(rf, ctx) { if (rf & 1) {
    const _r61 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HandySelectInputComponent_mat_form_field_1_span_10_Template_span_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r61); const ctx_r60 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r60.triggerSufixClick(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r40 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r40._sufixText);
} }
function HandySelectInputComponent_mat_form_field_1_mat_progress_spinner_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "mat-progress-spinner", 26);
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("diameter", 16);
} }
function HandySelectInputComponent_mat_form_field_1_mat_hint_12_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-hint", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r42 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r42._startHint);
} }
function HandySelectInputComponent_mat_form_field_1_mat_hint_13_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-hint", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r43 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r43._endHint);
} }
function HandySelectInputComponent_mat_form_field_1_mat_error_14_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-error", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "truncate");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r44 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matTooltip", ctx_r44._fieldErr);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](2, 2, ctx_r44._fieldErr));
} }
function HandySelectInputComponent_mat_form_field_1_Template(rf, ctx) { if (rf & 1) {
    const _r63 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-form-field", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "select", 30, 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function HandySelectInputComponent_mat_form_field_1_Template_select_ngModelChange_3_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r63); const ctx_r62 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r62._mobileValPlaceholder = $event; })("ngModelChange", function HandySelectInputComponent_mat_form_field_1_Template_select_ngModelChange_3_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r63); const ctx_r64 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r64.mobileChange(); })("focus", function HandySelectInputComponent_mat_form_field_1_Template_select_focus_3_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r63); const ctx_r65 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r65.onTouched(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, HandySelectInputComponent_mat_form_field_1_ng_container_5_Template, 3, 2, "ng-container", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, HandySelectInputComponent_mat_form_field_1_handy_icon_6_Template, 1, 2, "handy-icon", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, HandySelectInputComponent_mat_form_field_1_handy_icon_7_Template, 1, 2, "handy-icon", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](8, HandySelectInputComponent_mat_form_field_1_button_8_Template, 2, 2, "button", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, HandySelectInputComponent_mat_form_field_1_span_9_Template, 2, 1, "span", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](10, HandySelectInputComponent_mat_form_field_1_span_10_Template, 2, 1, "span", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, HandySelectInputComponent_mat_form_field_1_mat_progress_spinner_11_Template, 1, 1, "mat-progress-spinner", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](12, HandySelectInputComponent_mat_form_field_1_mat_hint_12_Template, 2, 1, "mat-hint", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](13, HandySelectInputComponent_mat_form_field_1_mat_hint_13_Template, 2, 1, "mat-hint", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](14, HandySelectInputComponent_mat_form_field_1_mat_error_14_Template, 3, 4, "mat-error", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("appearance", ctx_r1._appearance);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r1._label);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx_r1._mobileValPlaceholder)("disabled", ctx_r1._isDisabled);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r1._options);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r1._prefixIcon && ctx_r1._fieldStatus !== "PENDING" && !ctx_r1._pinningState);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r1._sufixIcon && ctx_r1._fieldStatus !== "PENDING" && !ctx_r1._pinningState);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r1._handyNgUserService.loggedInStatus && ctx_r1._pinningState && !ctx_r1._disableFieldPin);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r1._prefixText && ctx_r1._fieldStatus !== "PENDING" && !ctx_r1._pinningState);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r1._sufixText && ctx_r1._fieldStatus !== "PENDING" && !ctx_r1._pinningState);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r1._fieldStatus === "PENDING" && !ctx_r1._pinningState);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r1._startHint);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r1._endHint);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r1._fieldErr);
} }
class HandySelectInputComponent extends _handy_ng_extenders_handy_form_contol__WEBPACK_IMPORTED_MODULE_1__["HandyFormControl"] {
    constructor(ngControl, _handyNgUserService, _parentFormComponent, _handyNgLayoutService) {
        super(ngControl, _handyNgUserService, _parentFormComponent);
        this.ngControl = ngControl;
        this._handyNgUserService = _handyNgUserService;
        this._parentFormComponent = _parentFormComponent;
        this._handyNgLayoutService = _handyNgLayoutService;
        this._hasEmptyOption = true;
        this._emptyOptionLabel = 'None';
        this._options = [];
        this._stringifyPrefix = '_hngso_';
        this._stringifyValKey = '_hngso_value_';
        this._emptyReplacement = '_hnd_select_undefined_orNull_';
    }
    set hasEmptyOption(set) {
        this._hasEmptyOption = this._handyNgLayoutService.isMobile ? true : set;
    }
    set emptyOptionLabel(set) {
        this._emptyOptionLabel = set;
    }
    set options(set) {
        this._options = this._parseSelectOptions(JSON.parse(JSON.stringify(set)));
    }
    _parseSelectOptions(inputData) {
        let result = [];
        if (!Array.isArray(inputData)) {
            return result;
        }
        let optionsLen = inputData.length;
        if (optionsLen === 0) {
            return result;
        }
        let isSimple = (typeof inputData[0] === 'string' || typeof inputData[0] === 'number');
        if (isSimple) {
            for (let i = 0; i < optionsLen; i++) {
                const singleOption = inputData[i];
                result.push({
                    value: singleOption,
                    displayValue: singleOption,
                });
            }
        }
        else {
            // result = <unknown>inputData as HandyNgSelectOptionsData;
            result = inputData;
        }
        if (this._hasEmptyOption) {
            result.unshift({
                value: null,
                displayValue: this._emptyOptionLabel
            });
        }
        return this._stringifySelectOptions(result);
    }
    _stringifySelectOptions(data = []) {
        if (!this._handyNgLayoutService.isMobile) {
            return data;
        }
        let result = [];
        let optionsLen = data.length;
        for (let i = 0; i < optionsLen; i++) {
            const singleOption = data[i];
            if (singleOption['label']) {
                singleOption['options'] = this._stringifySelectOptions(singleOption['options']);
            }
            else {
                let value = singleOption['value'];
                singleOption['value'] = this._convertValToMobileString(value);
            }
            result.push(singleOption);
        }
        return result;
    }
    _convertValToMobileString(value) {
        if (value === null || value === undefined) {
            return this._emptyReplacement;
        }
        let result = (typeof value === 'string' || !value) ? value : `${this._stringifyPrefix}${JSON.stringify({ [this._stringifyValKey]: value })}`;
        return result;
    }
    _unstringifySelectValue(value) {
        if (value === this._emptyReplacement) {
            this._mobileValPlaceholder = undefined;
            return null;
        }
        if (typeof value === 'string' && value.startsWith(this._stringifyPrefix)) {
            value = JSON.parse(value.replace(this._stringifyPrefix, ''))[this._stringifyValKey];
        }
        return value;
    }
    mobileChange() {
        this._value = this._unstringifySelectValue(this._mobileValPlaceholder);
        this.updateChanges();
    }
    preWriteValueHook(value) {
        if (!this._handyNgLayoutService.isMobile) {
            return;
        }
        this._mobileValPlaceholder = this._convertValToMobileString(value);
        if (this._mobileValPlaceholder === this._emptyReplacement) {
            this._mobileValPlaceholder = undefined;
        }
    }
    ngOnInit() {
        super.ngOnInit();
    }
    ngOnDestroy() {
        super.ngOnDestroy();
    }
}
HandySelectInputComponent.ɵfac = function HandySelectInputComponent_Factory(t) { return new (t || HandySelectInputComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControl"], 10), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_handy_ng_services__WEBPACK_IMPORTED_MODULE_3__["HandyNgUserService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_handy_form_handy_form_component__WEBPACK_IMPORTED_MODULE_4__["HandyFormComponent"], 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_handy_ng_services__WEBPACK_IMPORTED_MODULE_3__["HandyNgLayoutService"])); };
HandySelectInputComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: HandySelectInputComponent, selectors: [["handy-select-input"]], viewQuery: function HandySelectInputComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, true);
    } if (rf & 2) {
        var _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._inputField = _t.first);
    } }, inputs: { appearance: "appearance", label: "label", disabled: "disabled", placeholder: "placeholder", prefixText: "prefixText", sufixText: "sufixText", prefixIcon: "prefixIcon", sufixIcon: "sufixIcon", debounceTime: "debounceTime", startHint: "startHint", endHint: "endHint", fieldName: "fieldName", pinningValue: "pinningValue", disableFieldPin: "disableFieldPin", hasEmptyOption: "hasEmptyOption", emptyOptionLabel: "emptyOptionLabel", options: "options" }, outputs: { valueChange: "valueChange", statusChange: "statusChange", prefixClick: "prefixClick", sufixClick: "sufixClick" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]], decls: 2, vars: 0, consts: [[3, "appearance", 4, "desktop"], [3, "appearance", 4, "mobile"], [3, "appearance"], [3, "ngModel", "disabled", "ngModelChange", "focus"], ["inputField", "ngModel"], [4, "ngFor", "ngForOf"], ["matPrefix", "", 3, "size", "icon", "click", 4, "ngIf"], ["matSuffix", "", 3, "size", "icon", "click", 4, "ngIf"], ["mat-icon-button", "", "matSuffix", "", 3, "click", 4, "ngIf"], ["matPrefix", "", 3, "click", 4, "ngIf"], ["matSuffix", "", 3, "click", 4, "ngIf"], ["matSuffix", "", "color", "primary", "mode", "indeterminate", 3, "diameter", 4, "ngIf"], ["align", "start", 4, "ngIf"], ["align", "end", 4, "ngIf"], [3, "matTooltip", 4, "ngIf"], [3, "value", "disabled", 4, "ngIf"], [3, "label", "disabled", 4, "ngIf"], [3, "value", "disabled"], [3, "label", "disabled"], [3, "value", "disabled", 4, "ngFor", "ngForOf"], ["matPrefix", "", 3, "size", "icon", "click"], ["matSuffix", "", 3, "size", "icon", "click"], ["mat-icon-button", "", "matSuffix", "", 3, "click"], [3, "size", "icon"], ["matPrefix", "", 3, "click"], ["matSuffix", "", 3, "click"], ["matSuffix", "", "color", "primary", "mode", "indeterminate", 3, "diameter"], ["align", "start"], ["align", "end"], [3, "matTooltip"], ["matNativeControl", "", 3, "ngModel", "disabled", "ngModelChange", "focus"], [3, "ngValue", "disabled", 4, "ngIf"], [3, "ngValue", "disabled"], [3, "ngValue", "disabled", 4, "ngFor", "ngForOf"]], template: function HandySelectInputComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, HandySelectInputComponent_mat_form_field_0_Template, 15, 14, "mat-form-field", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, HandySelectInputComponent_mat_form_field_1_Template, 15, 14, "mat-form-field", 1);
    } }, directives: [_handy_ng_directives_is_desktop_directive__WEBPACK_IMPORTED_MODULE_5__["IsDesktopDirective"], _handy_ng_directives_is_mobile_directive__WEBPACK_IMPORTED_MODULE_6__["IsMobileDirective"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__["MatFormField"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__["MatLabel"], _angular_material_select__WEBPACK_IMPORTED_MODULE_8__["MatSelect"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgModel"], _angular_common__WEBPACK_IMPORTED_MODULE_9__["NgForOf"], _angular_common__WEBPACK_IMPORTED_MODULE_9__["NgIf"], _angular_material_core__WEBPACK_IMPORTED_MODULE_10__["MatOption"], _angular_material_core__WEBPACK_IMPORTED_MODULE_10__["MatOptgroup"], _modules_shared_components_handy_icon_handy_icon_component__WEBPACK_IMPORTED_MODULE_11__["HandyIconComponent"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__["MatPrefix"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__["MatSuffix"], _angular_material_button__WEBPACK_IMPORTED_MODULE_12__["MatButton"], _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_13__["MatProgressSpinner"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__["MatHint"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__["MatError"], _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_14__["MatTooltip"], _angular_material_input__WEBPACK_IMPORTED_MODULE_15__["MatInput"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["SelectControlValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgSelectOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ɵangular_packages_forms_forms_x"]], pipes: [_handy_ng_pipes_truncate_pipe__WEBPACK_IMPORTED_MODULE_16__["TruncatePipe"]], styles: ["[_nghost-%COMP%] {\n  display: block;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvaGFuZHkvbW9kdWxlcy9oYW5keS1mb3JtL2NvbXBvbmVudHMvaGFuZHktc2VsZWN0LWlucHV0L2hhbmR5LXNlbGVjdC1pbnB1dC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGNBQUE7QUFDRiIsImZpbGUiOiJzcmMvYXBwL2hhbmR5L21vZHVsZXMvaGFuZHktZm9ybS9jb21wb25lbnRzL2hhbmR5LXNlbGVjdC1pbnB1dC9oYW5keS1zZWxlY3QtaW5wdXQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdCB7XHJcbiAgZGlzcGxheTogYmxvY2s7XHJcbn1cclxuIl19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](HandySelectInputComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'handy-select-input',
                templateUrl: './handy-select-input.component.html',
                styleUrls: ['./handy-select-input.component.scss'],
                inputs: [
                    'appearance', 'label', 'disabled', 'placeholder',
                    'prefixText', 'sufixText', 'prefixIcon',
                    'sufixIcon',
                    'debounceTime', 'startHint', 'endHint', 'fieldName',
                    'pinningValue', 'disableFieldPin',
                    'hasEmptyOption', 'emptyOptionLabel', 'options'
                ],
                outputs: [
                    'valueChange', 'statusChange', 'prefixClick', 'sufixClick'
                ]
            }]
    }], function () { return [{ type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControl"], decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
            }, {
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Self"]
            }] }, { type: _handy_ng_services__WEBPACK_IMPORTED_MODULE_3__["HandyNgUserService"] }, { type: _handy_form_handy_form_component__WEBPACK_IMPORTED_MODULE_4__["HandyFormComponent"], decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
            }] }, { type: _handy_ng_services__WEBPACK_IMPORTED_MODULE_3__["HandyNgLayoutService"] }]; }, { _inputField: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: ['inputField', { static: false }]
        }], hasEmptyOption: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], emptyOptionLabel: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], options: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }] }); })();


/***/ }),

/***/ "./src/app/handy/modules/handy-form/components/handy-text-input/handy-text-input.component.ts":
/*!****************************************************************************************************!*\
  !*** ./src/app/handy/modules/handy-form/components/handy-text-input/handy-text-input.component.ts ***!
  \****************************************************************************************************/
/*! exports provided: HandyTextInputComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HandyTextInputComponent", function() { return HandyTextInputComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _handy_ng_extenders_handy_form_contol__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @handy-ng/extenders/handy-form-contol */ "./src/app/handy/extenders/handy-form-contol.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _handy_ng_services__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @handy-ng/services */ "./src/app/handy/services/index.ts");
/* harmony import */ var _handy_form_handy_form_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../handy-form/handy-form.component */ "./src/app/handy/modules/handy-form/components/handy-form/handy-form.component.ts");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/form-field */ "./node_modules/@angular/material/fesm2015/form-field.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/input */ "./node_modules/@angular/material/fesm2015/input.js");
/* harmony import */ var _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/autocomplete */ "./node_modules/@angular/material/fesm2015/autocomplete.js");
/* harmony import */ var _modules_shared_components_handy_icon_handy_icon_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../../modules/shared/components/handy-icon/handy-icon.component */ "./src/app/modules/shared/components/handy-icon/handy-icon.component.ts");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/fesm2015/button.js");
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/progress-spinner */ "./node_modules/@angular/material/fesm2015/progress-spinner.js");
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/tooltip */ "./node_modules/@angular/material/fesm2015/tooltip.js");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/core */ "./node_modules/@angular/material/fesm2015/core.js");
/* harmony import */ var _handy_ng_pipes_truncate_pipe__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @handy-ng/pipes/truncate.pipe */ "./src/app/handy/pipes/truncate.pipe.ts");
















function HandyTextInputComponent_mat_label_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r0._label);
} }
function HandyTextInputComponent_handy_icon_5_Template(rf, ctx) { if (rf & 1) {
    const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "handy-icon", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HandyTextInputComponent_handy_icon_5_Template_handy_icon_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r16); const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r15.triggerPrefixClick(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("size", ctx_r3._prefixAndSufixIconSize)("icon", ctx_r3._prefixIcon);
} }
function HandyTextInputComponent_handy_icon_6_Template(rf, ctx) { if (rf & 1) {
    const _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "handy-icon", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HandyTextInputComponent_handy_icon_6_Template_handy_icon_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r18); const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r17.triggerSufixClick(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("size", ctx_r4._prefixAndSufixIconSize)("icon", ctx_r4._sufixIcon);
} }
function HandyTextInputComponent_button_7_Template(rf, ctx) { if (rf & 1) {
    const _r20 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HandyTextInputComponent_button_7_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r20); const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r19.handlePinClick(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "handy-icon", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("size", 16)("icon", ctx_r5._hasPinnedVal ? "lock" : "lock_open");
} }
function HandyTextInputComponent_span_8_Template(rf, ctx) { if (rf & 1) {
    const _r22 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HandyTextInputComponent_span_8_Template_span_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r22); const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r21.triggerPrefixClick(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r6._prefixText);
} }
function HandyTextInputComponent_span_9_Template(rf, ctx) { if (rf & 1) {
    const _r24 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HandyTextInputComponent_span_9_Template_span_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r24); const ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r23.triggerSufixClick(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r7._sufixText);
} }
function HandyTextInputComponent_mat_progress_spinner_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "mat-progress-spinner", 20);
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("diameter", 16);
} }
function HandyTextInputComponent_mat_hint_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-hint", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r9._startHint);
} }
function HandyTextInputComponent_mat_hint_12_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-hint", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r10._endHint);
} }
function HandyTextInputComponent_mat_error_13_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-error", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "truncate");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matTooltip", ctx_r11._fieldErr);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](2, 2, ctx_r11._fieldErr));
} }
function HandyTextInputComponent_div_16_mat_option_1_Template(rf, ctx) { if (rf & 1) {
    const _r28 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-option", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("onSelectionChange", function HandyTextInputComponent_div_16_mat_option_1_Template_mat_option_onSelectionChange_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r28); const option_r26 = ctx.$implicit; const ctx_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r27.autocompleteSelected.next({ selectEvent: $event, emitVal: option_r26.emitVal }); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const option_r26 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", option_r26.fieldValue);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](option_r26.displayValue);
} }
function HandyTextInputComponent_div_16_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, HandyTextInputComponent_div_16_mat_option_1_Template, 2, 2, "mat-option", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](2, 1, ctx_r13._simpleAutocomplete));
} }
function HandyTextInputComponent_div_17_mat_optgroup_1_mat_option_1_Template(rf, ctx) { if (rf & 1) {
    const _r34 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-option", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("onSelectionChange", function HandyTextInputComponent_div_17_mat_optgroup_1_mat_option_1_Template_mat_option_onSelectionChange_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r34); const option_r32 = ctx.$implicit; const ctx_r33 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3); return ctx_r33.autocompleteSelected.next({ selectEvent: $event, emitVal: option_r32.emitVal }); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const option_r32 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", option_r32.fieldValue);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", option_r32.displayValue, " ");
} }
function HandyTextInputComponent_div_17_mat_optgroup_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-optgroup", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, HandyTextInputComponent_div_17_mat_optgroup_1_mat_option_1_Template, 2, 2, "mat-option", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const group_r30 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("label", group_r30.groupName);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", group_r30.groupOptions);
} }
function HandyTextInputComponent_div_17_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, HandyTextInputComponent_div_17_mat_optgroup_1_Template, 2, 2, "mat-optgroup", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](2, 1, ctx_r14._groupAutocomplete));
} }
class HandyTextInputComponent extends _handy_ng_extenders_handy_form_contol__WEBPACK_IMPORTED_MODULE_1__["HandyFormControl"] {
    constructor(ngControl, _handyNgUserService, _parentFormComponent) {
        super(ngControl, _handyNgUserService, _parentFormComponent);
        this.ngControl = ngControl;
        this._handyNgUserService = _handyNgUserService;
        this._parentFormComponent = _parentFormComponent;
    }
    ngOnInit() {
        super.ngOnInit();
    }
    ngOnDestroy() {
        super.ngOnDestroy();
    }
}
HandyTextInputComponent.ɵfac = function HandyTextInputComponent_Factory(t) { return new (t || HandyTextInputComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControl"], 10), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_handy_ng_services__WEBPACK_IMPORTED_MODULE_3__["HandyNgUserService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_handy_form_handy_form_component__WEBPACK_IMPORTED_MODULE_4__["HandyFormComponent"], 8)); };
HandyTextInputComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: HandyTextInputComponent, selectors: [["handy-text-input"]], inputs: { appearance: "appearance", label: "label", placeholder: "placeholder", disabled: "disabled", prefixText: "prefixText", sufixText: "sufixText", prefixIcon: "prefixIcon", sufixIcon: "sufixIcon", debounceTime: "debounceTime", startHint: "startHint", endHint: "endHint", fieldName: "fieldName", pinningValue: "pinningValue", disableFieldPin: "disableFieldPin", autocomplete: "autocomplete", simpleAutoCompleteFilter: "simpleAutoCompleteFilter" }, outputs: { valueChange: "valueChange", statusChange: "statusChange", prefixClick: "prefixClick", sufixClick: "sufixClick", autocompleteSelected: "autocompleteSelected" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]], decls: 18, vars: 18, consts: [[3, "appearance"], [4, "ngIf"], ["matInput", "", 3, "matAutocomplete", "disabled", "ngModel", "type", "placeholder", "focus", "click", "keyup", "ngModelChange"], ["inputField", "ngModel", "inputElmRef", ""], ["matPrefix", "", 3, "size", "icon", "click", 4, "ngIf"], ["matSuffix", "", 3, "size", "icon", "click", 4, "ngIf"], ["mat-icon-button", "", "matSuffix", "", 3, "click", 4, "ngIf"], ["matPrefix", "", 3, "click", 4, "ngIf"], ["matSuffix", "", 3, "click", 4, "ngIf"], ["matSuffix", "", "color", "primary", "mode", "indeterminate", 3, "diameter", 4, "ngIf"], ["align", "start", 4, "ngIf"], ["align", "end", 4, "ngIf"], [3, "matTooltip", 4, "ngIf"], ["auto", "matAutocomplete"], ["matPrefix", "", 3, "size", "icon", "click"], ["matSuffix", "", 3, "size", "icon", "click"], ["mat-icon-button", "", "matSuffix", "", 3, "click"], [3, "size", "icon"], ["matPrefix", "", 3, "click"], ["matSuffix", "", 3, "click"], ["matSuffix", "", "color", "primary", "mode", "indeterminate", 3, "diameter"], ["align", "start"], ["align", "end"], [3, "matTooltip"], [3, "value", "onSelectionChange", 4, "ngFor", "ngForOf"], [3, "value", "onSelectionChange"], [3, "label", 4, "ngFor", "ngForOf"], [3, "label"]], template: function HandyTextInputComponent_Template(rf, ctx) { if (rf & 1) {
        const _r35 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-form-field", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, HandyTextInputComponent_mat_label_1_Template, 2, 1, "mat-label", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "input", 2, 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("focus", function HandyTextInputComponent_Template_input_focus_2_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r35); const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](4); return ctx.asignInputElm(_r2); })("click", function HandyTextInputComponent_Template_input_click_2_listener() { return ctx.asignCaretPos(); })("keyup", function HandyTextInputComponent_Template_input_keyup_2_listener() { return ctx.asignCaretPos(); })("focus", function HandyTextInputComponent_Template_input_focus_2_listener() { return ctx._parseAutocompleteData(); })("ngModelChange", function HandyTextInputComponent_Template_input_ngModelChange_2_listener($event) { return ctx._value = $event; })("ngModelChange", function HandyTextInputComponent_Template_input_ngModelChange_2_listener() { return ctx.updateChanges(); })("focus", function HandyTextInputComponent_Template_input_focus_2_listener() { return ctx.onTouched(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, HandyTextInputComponent_handy_icon_5_Template, 1, 2, "handy-icon", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, HandyTextInputComponent_handy_icon_6_Template, 1, 2, "handy-icon", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, HandyTextInputComponent_button_7_Template, 2, 2, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](8, HandyTextInputComponent_span_8_Template, 2, 1, "span", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, HandyTextInputComponent_span_9_Template, 2, 1, "span", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](10, HandyTextInputComponent_mat_progress_spinner_10_Template, 1, 1, "mat-progress-spinner", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, HandyTextInputComponent_mat_hint_11_Template, 2, 1, "mat-hint", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](12, HandyTextInputComponent_mat_hint_12_Template, 2, 1, "mat-hint", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](13, HandyTextInputComponent_mat_error_13_Template, 3, 4, "mat-error", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "mat-autocomplete", null, 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](16, HandyTextInputComponent_div_16_Template, 3, 3, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](17, HandyTextInputComponent_div_17_Template, 3, 3, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("appearance", ctx._appearance);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._label);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matAutocomplete", _r12)("disabled", ctx._isDisabled)("ngModel", ctx._value)("type", "text")("placeholder", ctx._placeholder);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._prefixIcon && ctx._fieldStatus !== "PENDING" && !ctx._pinningState);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._sufixIcon && ctx._fieldStatus !== "PENDING" && !ctx._pinningState);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._handyNgUserService.loggedInStatus && ctx._pinningState && !ctx._disableFieldPin);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._prefixText && ctx._fieldStatus !== "PENDING" && !ctx._pinningState);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._sufixText && ctx._fieldStatus !== "PENDING" && !ctx._pinningState);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._fieldStatus === "PENDING" && !ctx._pinningState);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._startHint);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._endHint);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._fieldErr);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._hasAutocomplete && ctx._autocompleteType === "simple");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._hasAutocomplete && ctx._autocompleteType === "group");
    } }, directives: [_angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__["MatFormField"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["NgIf"], _angular_material_input__WEBPACK_IMPORTED_MODULE_7__["MatInput"], _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_8__["MatAutocompleteTrigger"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgModel"], _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_8__["MatAutocomplete"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__["MatLabel"], _modules_shared_components_handy_icon_handy_icon_component__WEBPACK_IMPORTED_MODULE_9__["HandyIconComponent"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__["MatPrefix"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__["MatSuffix"], _angular_material_button__WEBPACK_IMPORTED_MODULE_10__["MatButton"], _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_11__["MatProgressSpinner"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__["MatHint"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__["MatError"], _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_12__["MatTooltip"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["NgForOf"], _angular_material_core__WEBPACK_IMPORTED_MODULE_13__["MatOption"], _angular_material_core__WEBPACK_IMPORTED_MODULE_13__["MatOptgroup"]], pipes: [_handy_ng_pipes_truncate_pipe__WEBPACK_IMPORTED_MODULE_14__["TruncatePipe"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["AsyncPipe"]], styles: ["[_nghost-%COMP%] {\n  display: block;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvaGFuZHkvbW9kdWxlcy9oYW5keS1mb3JtL2NvbXBvbmVudHMvaGFuZHktdGV4dC1pbnB1dC9oYW5keS10ZXh0LWlucHV0LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsY0FBQTtBQUNGIiwiZmlsZSI6InNyYy9hcHAvaGFuZHkvbW9kdWxlcy9oYW5keS1mb3JtL2NvbXBvbmVudHMvaGFuZHktdGV4dC1pbnB1dC9oYW5keS10ZXh0LWlucHV0LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3Qge1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG59Il19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](HandyTextInputComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'handy-text-input',
                templateUrl: './handy-text-input.component.html',
                styleUrls: ['./handy-text-input.component.scss'],
                inputs: [
                    'appearance', 'label', 'placeholder', 'disabled',
                    'prefixText', 'sufixText', 'prefixIcon',
                    'sufixIcon',
                    'debounceTime', 'startHint', 'endHint', 'fieldName',
                    'pinningValue', 'disableFieldPin', 'autocomplete', 'simpleAutoCompleteFilter',
                ],
                outputs: [
                    'valueChange', 'statusChange', 'prefixClick', 'sufixClick', 'autocompleteSelected'
                ]
            }]
    }], function () { return [{ type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControl"], decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
            }, {
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Self"]
            }] }, { type: _handy_ng_services__WEBPACK_IMPORTED_MODULE_3__["HandyNgUserService"] }, { type: _handy_form_handy_form_component__WEBPACK_IMPORTED_MODULE_4__["HandyFormComponent"], decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
            }] }]; }, null); })();


/***/ }),

/***/ "./src/app/handy/modules/handy-form/components/handy-textarea-input/handy-textarea-input.component.ts":
/*!************************************************************************************************************!*\
  !*** ./src/app/handy/modules/handy-form/components/handy-textarea-input/handy-textarea-input.component.ts ***!
  \************************************************************************************************************/
/*! exports provided: HandyTextAreaInputComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HandyTextAreaInputComponent", function() { return HandyTextAreaInputComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _handy_ng_extenders_handy_form_contol__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @handy-ng/extenders/handy-form-contol */ "./src/app/handy/extenders/handy-form-contol.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _handy_ng_services__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @handy-ng/services */ "./src/app/handy/services/index.ts");
/* harmony import */ var _handy_form_handy_form_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../handy-form/handy-form.component */ "./src/app/handy/modules/handy-form/components/handy-form/handy-form.component.ts");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/form-field */ "./node_modules/@angular/material/fesm2015/form-field.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/input */ "./node_modules/@angular/material/fesm2015/input.js");
/* harmony import */ var _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/autocomplete */ "./node_modules/@angular/material/fesm2015/autocomplete.js");
/* harmony import */ var _modules_shared_components_handy_icon_handy_icon_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../../modules/shared/components/handy-icon/handy-icon.component */ "./src/app/modules/shared/components/handy-icon/handy-icon.component.ts");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/fesm2015/button.js");
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/progress-spinner */ "./node_modules/@angular/material/fesm2015/progress-spinner.js");
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/tooltip */ "./node_modules/@angular/material/fesm2015/tooltip.js");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/core */ "./node_modules/@angular/material/fesm2015/core.js");
/* harmony import */ var _handy_ng_pipes_truncate_pipe__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @handy-ng/pipes/truncate.pipe */ "./src/app/handy/pipes/truncate.pipe.ts");
















function HandyTextAreaInputComponent_mat_label_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r0._label);
} }
function HandyTextAreaInputComponent_handy_icon_4_Template(rf, ctx) { if (rf & 1) {
    const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "handy-icon", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HandyTextAreaInputComponent_handy_icon_4_Template_handy_icon_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r15); const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r14.triggerPrefixClick(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("size", ctx_r2._prefixAndSufixIconSize)("icon", ctx_r2._prefixIcon);
} }
function HandyTextAreaInputComponent_handy_icon_5_Template(rf, ctx) { if (rf & 1) {
    const _r17 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "handy-icon", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HandyTextAreaInputComponent_handy_icon_5_Template_handy_icon_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r17); const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r16.triggerSufixClick(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("size", ctx_r3._prefixAndSufixIconSize)("icon", ctx_r3._sufixIcon);
} }
function HandyTextAreaInputComponent_button_6_Template(rf, ctx) { if (rf & 1) {
    const _r19 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HandyTextAreaInputComponent_button_6_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r19); const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r18.handlePinClick(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "handy-icon", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("size", 16)("icon", ctx_r4._hasPinnedVal ? "lock" : "lock_open");
} }
function HandyTextAreaInputComponent_span_7_Template(rf, ctx) { if (rf & 1) {
    const _r21 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HandyTextAreaInputComponent_span_7_Template_span_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r21); const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r20.triggerPrefixClick(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r5._prefixText);
} }
function HandyTextAreaInputComponent_span_8_Template(rf, ctx) { if (rf & 1) {
    const _r23 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HandyTextAreaInputComponent_span_8_Template_span_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r23); const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r22.triggerSufixClick(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r6._sufixText);
} }
function HandyTextAreaInputComponent_mat_progress_spinner_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "mat-progress-spinner", 20);
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("diameter", 16);
} }
function HandyTextAreaInputComponent_mat_hint_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-hint", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r8._startHint);
} }
function HandyTextAreaInputComponent_mat_hint_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-hint", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r9._endHint);
} }
function HandyTextAreaInputComponent_mat_error_12_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-error", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "truncate");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matTooltip", ctx_r10._fieldErr);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](2, 2, ctx_r10._fieldErr));
} }
function HandyTextAreaInputComponent_div_15_mat_option_1_Template(rf, ctx) { if (rf & 1) {
    const _r27 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-option", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("onSelectionChange", function HandyTextAreaInputComponent_div_15_mat_option_1_Template_mat_option_onSelectionChange_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r27); const option_r25 = ctx.$implicit; const ctx_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r26.autocompleteSelected.next({ selectEvent: $event, emitVal: option_r25.emitVal }); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const option_r25 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", option_r25.fieldValue);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](option_r25.displayValue);
} }
function HandyTextAreaInputComponent_div_15_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, HandyTextAreaInputComponent_div_15_mat_option_1_Template, 2, 2, "mat-option", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](2, 1, ctx_r12._simpleAutocomplete));
} }
function HandyTextAreaInputComponent_div_16_mat_optgroup_1_mat_option_1_Template(rf, ctx) { if (rf & 1) {
    const _r33 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-option", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("onSelectionChange", function HandyTextAreaInputComponent_div_16_mat_optgroup_1_mat_option_1_Template_mat_option_onSelectionChange_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r33); const option_r31 = ctx.$implicit; const ctx_r32 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3); return ctx_r32.autocompleteSelected.next({ selectEvent: $event, emitVal: option_r31.emitVal }); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const option_r31 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", option_r31.fieldValue);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", option_r31.displayValue, " ");
} }
function HandyTextAreaInputComponent_div_16_mat_optgroup_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-optgroup", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, HandyTextAreaInputComponent_div_16_mat_optgroup_1_mat_option_1_Template, 2, 2, "mat-option", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const group_r29 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("label", group_r29.groupName);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", group_r29.groupOptions);
} }
function HandyTextAreaInputComponent_div_16_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, HandyTextAreaInputComponent_div_16_mat_optgroup_1_Template, 2, 2, "mat-optgroup", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](2, 1, ctx_r13._groupAutocomplete));
} }
class HandyTextAreaInputComponent extends _handy_ng_extenders_handy_form_contol__WEBPACK_IMPORTED_MODULE_1__["HandyFormControl"] {
    constructor(ngControl, _handyNgUserService, _parentFormComponent) {
        super(ngControl, _handyNgUserService, _parentFormComponent);
        this.ngControl = ngControl;
        this._handyNgUserService = _handyNgUserService;
        this._parentFormComponent = _parentFormComponent;
        this.__handleEnterSubmitting = false;
        this._rows = 2;
    }
    set rows(set) {
        this._rows = set;
    }
    ngOnInit() {
        if (this._parentFormComponent && !this._parentFormComponent.disableEnterSubmit) {
            this.__handleEnterSubmitting = true;
        }
        super.ngOnInit();
    }
    ngOnDestroy() {
        super.ngOnDestroy();
    }
    disableEnterSubmit() {
        if (this.__handleEnterSubmitting) {
            this._parentFormComponent.disableEnterSubmit = true;
        }
    }
    enableEnterSubmit() {
        if (this.__handleEnterSubmitting) {
            this._parentFormComponent.disableEnterSubmit = false;
        }
    }
}
HandyTextAreaInputComponent.ɵfac = function HandyTextAreaInputComponent_Factory(t) { return new (t || HandyTextAreaInputComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControl"], 10), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_handy_ng_services__WEBPACK_IMPORTED_MODULE_3__["HandyNgUserService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_handy_form_handy_form_component__WEBPACK_IMPORTED_MODULE_4__["HandyFormComponent"], 8)); };
HandyTextAreaInputComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: HandyTextAreaInputComponent, selectors: [["handy-textarea-input"]], inputs: { appearance: "appearance", label: "label", placeholder: "placeholder", disabled: "disabled", prefixText: "prefixText", sufixText: "sufixText", prefixIcon: "prefixIcon", sufixIcon: "sufixIcon", debounceTime: "debounceTime", startHint: "startHint", endHint: "endHint", fieldName: "fieldName", pinningValue: "pinningValue", disableFieldPin: "disableFieldPin", autocomplete: "autocomplete", simpleAutoCompleteFilter: "simpleAutoCompleteFilter", rows: "rows" }, outputs: { valueChange: "valueChange", statusChange: "statusChange", prefixClick: "prefixClick", sufixClick: "sufixClick" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]], decls: 17, vars: 18, consts: [[3, "appearance"], [4, "ngIf"], ["matInput", "", 3, "rows", "ngModel", "placeholder", "matAutocomplete", "disabled", "ngModelChange", "focus", "blur"], ["inputField", "ngModel"], ["matPrefix", "", 3, "size", "icon", "click", 4, "ngIf"], ["matSuffix", "", 3, "size", "icon", "click", 4, "ngIf"], ["mat-icon-button", "", "matSuffix", "", 3, "click", 4, "ngIf"], ["matPrefix", "", 3, "click", 4, "ngIf"], ["matSuffix", "", 3, "click", 4, "ngIf"], ["matSuffix", "", "color", "primary", "mode", "indeterminate", 3, "diameter", 4, "ngIf"], ["align", "start", 4, "ngIf"], ["align", "end", 4, "ngIf"], [3, "matTooltip", 4, "ngIf"], ["auto", "matAutocomplete"], ["matPrefix", "", 3, "size", "icon", "click"], ["matSuffix", "", 3, "size", "icon", "click"], ["mat-icon-button", "", "matSuffix", "", 3, "click"], [3, "size", "icon"], ["matPrefix", "", 3, "click"], ["matSuffix", "", 3, "click"], ["matSuffix", "", "color", "primary", "mode", "indeterminate", 3, "diameter"], ["align", "start"], ["align", "end"], [3, "matTooltip"], [3, "value", "onSelectionChange", 4, "ngFor", "ngForOf"], [3, "value", "onSelectionChange"], [3, "label", 4, "ngFor", "ngForOf"], [3, "label"]], template: function HandyTextAreaInputComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-form-field", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, HandyTextAreaInputComponent_mat_label_1_Template, 2, 1, "mat-label", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "textarea", 2, 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function HandyTextAreaInputComponent_Template_textarea_ngModelChange_2_listener($event) { return ctx._value = $event; })("ngModelChange", function HandyTextAreaInputComponent_Template_textarea_ngModelChange_2_listener() { return ctx.updateChanges(); })("focus", function HandyTextAreaInputComponent_Template_textarea_focus_2_listener() { return ctx.disableEnterSubmit(); })("blur", function HandyTextAreaInputComponent_Template_textarea_blur_2_listener() { return ctx.enableEnterSubmit(); })("focus", function HandyTextAreaInputComponent_Template_textarea_focus_2_listener() { return ctx._parseAutocompleteData(); })("focus", function HandyTextAreaInputComponent_Template_textarea_focus_2_listener() { return ctx.onTouched(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, HandyTextAreaInputComponent_handy_icon_4_Template, 1, 2, "handy-icon", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, HandyTextAreaInputComponent_handy_icon_5_Template, 1, 2, "handy-icon", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, HandyTextAreaInputComponent_button_6_Template, 2, 2, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, HandyTextAreaInputComponent_span_7_Template, 2, 1, "span", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](8, HandyTextAreaInputComponent_span_8_Template, 2, 1, "span", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, HandyTextAreaInputComponent_mat_progress_spinner_9_Template, 1, 1, "mat-progress-spinner", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](10, HandyTextAreaInputComponent_mat_hint_10_Template, 2, 1, "mat-hint", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, HandyTextAreaInputComponent_mat_hint_11_Template, 2, 1, "mat-hint", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](12, HandyTextAreaInputComponent_mat_error_12_Template, 3, 4, "mat-error", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "mat-autocomplete", null, 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](15, HandyTextAreaInputComponent_div_15_Template, 3, 3, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](16, HandyTextAreaInputComponent_div_16_Template, 3, 3, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("appearance", ctx._appearance);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._label);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("rows", ctx._rows ? ctx._rows : null)("ngModel", ctx._value)("placeholder", ctx._placeholder)("matAutocomplete", _r11)("disabled", ctx._isDisabled);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._prefixIcon && ctx._fieldStatus !== "PENDING" && !ctx._pinningState);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._sufixIcon && ctx._fieldStatus !== "PENDING" && !ctx._pinningState);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._handyNgUserService.loggedInStatus && ctx._pinningState && !ctx._disableFieldPin);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._prefixText && ctx._fieldStatus !== "PENDING" && !ctx._pinningState);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._sufixText && ctx._fieldStatus !== "PENDING" && !ctx._pinningState);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._fieldStatus === "PENDING" && !ctx._pinningState);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._startHint);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._endHint);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._fieldErr);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._hasAutocomplete && ctx._autocompleteType === "simple");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._hasAutocomplete && ctx._autocompleteType === "group");
    } }, directives: [_angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__["MatFormField"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["NgIf"], _angular_material_input__WEBPACK_IMPORTED_MODULE_7__["MatInput"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["DefaultValueAccessor"], _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_8__["MatAutocompleteTrigger"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgModel"], _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_8__["MatAutocomplete"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__["MatLabel"], _modules_shared_components_handy_icon_handy_icon_component__WEBPACK_IMPORTED_MODULE_9__["HandyIconComponent"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__["MatPrefix"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__["MatSuffix"], _angular_material_button__WEBPACK_IMPORTED_MODULE_10__["MatButton"], _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_11__["MatProgressSpinner"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__["MatHint"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__["MatError"], _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_12__["MatTooltip"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["NgForOf"], _angular_material_core__WEBPACK_IMPORTED_MODULE_13__["MatOption"], _angular_material_core__WEBPACK_IMPORTED_MODULE_13__["MatOptgroup"]], pipes: [_handy_ng_pipes_truncate_pipe__WEBPACK_IMPORTED_MODULE_14__["TruncatePipe"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["AsyncPipe"]], styles: ["[_nghost-%COMP%] {\n  display: block;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvaGFuZHkvbW9kdWxlcy9oYW5keS1mb3JtL2NvbXBvbmVudHMvaGFuZHktdGV4dGFyZWEtaW5wdXQvaGFuZHktdGV4dGFyZWEtaW5wdXQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxjQUFBO0FBQ0YiLCJmaWxlIjoic3JjL2FwcC9oYW5keS9tb2R1bGVzL2hhbmR5LWZvcm0vY29tcG9uZW50cy9oYW5keS10ZXh0YXJlYS1pbnB1dC9oYW5keS10ZXh0YXJlYS1pbnB1dC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIjpob3N0IHtcclxuICBkaXNwbGF5OiBibG9jaztcclxufVxyXG4iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](HandyTextAreaInputComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'handy-textarea-input',
                templateUrl: './handy-textarea-input.component.html',
                styleUrls: ['./handy-textarea-input.component.scss'],
                inputs: [
                    'appearance', 'label', 'placeholder', 'disabled',
                    'prefixText', 'sufixText', 'prefixIcon',
                    'sufixIcon',
                    'debounceTime', 'startHint', 'endHint', 'fieldName',
                    'pinningValue', 'disableFieldPin', 'autocomplete', 'simpleAutoCompleteFilter',
                    'rows'
                ],
                outputs: [
                    'valueChange', 'statusChange', 'prefixClick', 'sufixClick'
                ]
            }]
    }], function () { return [{ type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControl"], decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
            }, {
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Self"]
            }] }, { type: _handy_ng_services__WEBPACK_IMPORTED_MODULE_3__["HandyNgUserService"] }, { type: _handy_form_handy_form_component__WEBPACK_IMPORTED_MODULE_4__["HandyFormComponent"], decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
            }] }]; }, { rows: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }] }); })();


/***/ }),

/***/ "./src/app/handy/modules/handy-form/components/handy-time-input/handy-time-input.component.ts":
/*!****************************************************************************************************!*\
  !*** ./src/app/handy/modules/handy-form/components/handy-time-input/handy-time-input.component.ts ***!
  \****************************************************************************************************/
/*! exports provided: HandyTimeInputComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HandyTimeInputComponent", function() { return HandyTimeInputComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _handy_ng_extenders_handy_form_contol__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @handy-ng/extenders/handy-form-contol */ "./src/app/handy/extenders/handy-form-contol.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _handy_ng_services__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @handy-ng/services */ "./src/app/handy/services/index.ts");
/* harmony import */ var _handy_form_handy_form_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../handy-form/handy-form.component */ "./src/app/handy/modules/handy-form/components/handy-form/handy-form.component.ts");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/form-field */ "./node_modules/@angular/material/fesm2015/form-field.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/input */ "./node_modules/@angular/material/fesm2015/input.js");
/* harmony import */ var _modules_shared_components_handy_icon_handy_icon_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../../modules/shared/components/handy-icon/handy-icon.component */ "./src/app/modules/shared/components/handy-icon/handy-icon.component.ts");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/fesm2015/button.js");
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/progress-spinner */ "./node_modules/@angular/material/fesm2015/progress-spinner.js");
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/tooltip */ "./node_modules/@angular/material/fesm2015/tooltip.js");
/* harmony import */ var _handy_ng_pipes_truncate_pipe__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @handy-ng/pipes/truncate.pipe */ "./src/app/handy/pipes/truncate.pipe.ts");














function HandyTimeInputComponent_mat_label_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r0._label);
} }
function HandyTimeInputComponent_handy_icon_4_Template(rf, ctx) { if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "handy-icon", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HandyTimeInputComponent_handy_icon_4_Template_handy_icon_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r12); const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r11.triggerPrefixClick(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("size", ctx_r2._prefixAndSufixIconSize)("icon", ctx_r2._prefixIcon);
} }
function HandyTimeInputComponent_handy_icon_5_Template(rf, ctx) { if (rf & 1) {
    const _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "handy-icon", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HandyTimeInputComponent_handy_icon_5_Template_handy_icon_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r14); const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r13.triggerSufixClick(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("size", ctx_r3._prefixAndSufixIconSize)("icon", ctx_r3._sufixIcon);
} }
function HandyTimeInputComponent_button_6_Template(rf, ctx) { if (rf & 1) {
    const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HandyTimeInputComponent_button_6_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r16); const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r15.handlePinClick(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "handy-icon", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("size", 16)("icon", ctx_r4._hasPinnedVal ? "lock" : "lock_open");
} }
function HandyTimeInputComponent_span_7_Template(rf, ctx) { if (rf & 1) {
    const _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HandyTimeInputComponent_span_7_Template_span_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r18); const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r17.triggerPrefixClick(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r5._prefixText);
} }
function HandyTimeInputComponent_span_8_Template(rf, ctx) { if (rf & 1) {
    const _r20 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HandyTimeInputComponent_span_8_Template_span_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r20); const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r19.triggerSufixClick(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r6._sufixText);
} }
function HandyTimeInputComponent_mat_progress_spinner_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "mat-progress-spinner", 19);
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("diameter", 16);
} }
function HandyTimeInputComponent_mat_hint_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-hint", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r8._startHint);
} }
function HandyTimeInputComponent_mat_hint_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-hint", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r9._endHint);
} }
function HandyTimeInputComponent_mat_error_12_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-error", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "truncate");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matTooltip", ctx_r10._fieldErr);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](2, 2, ctx_r10._fieldErr));
} }
class HandyTimeInputComponent extends _handy_ng_extenders_handy_form_contol__WEBPACK_IMPORTED_MODULE_1__["HandyFormControl"] {
    constructor(ngControl, _handyNgUserService, _parentFormComponent) {
        super(ngControl, _handyNgUserService, _parentFormComponent);
        this.ngControl = ngControl;
        this._handyNgUserService = _handyNgUserService;
        this._parentFormComponent = _parentFormComponent;
        this._minSecondsVal = 0;
        this._maxSecondsVal = 86400;
        this._returnType = 'string';
    }
    set min(min) {
        this._minVal = min;
        this._minSecondsVal = (this._minVal) ? this.getSecondsValue(this._minVal) : 0;
    }
    set max(max) {
        this._maxVal = max;
        this._maxSecondsVal = (this._maxVal) ? this.getSecondsValue(this._maxVal) : 86400;
    }
    set valueType(set) {
        this._returnType = set;
    }
    _parseInitialValue() {
        if (typeof this._value === 'string' && this._returnType === 'seconds' && this._value.length === 5) {
            this.updateChanges();
        }
        if (typeof this._value === 'number' && this._returnType === 'string') {
            this.updateChanges();
        }
        if (typeof this._value !== 'number') {
            return;
        }
        this._value = this.getStringTimeValue();
    }
    updateChanges(focusOut = false) {
        if (focusOut && (this._maxVal || this._minVal) && this._hasValidTimeVal()) {
            let actualVal = this.getSecondsValue();
            if (actualVal) {
                if (actualVal < this._minSecondsVal) {
                    this._value = this.getStringTimeValue(this._minSecondsVal);
                    this._changeDisplayValueOnly();
                }
                if (actualVal > this._maxSecondsVal) {
                    this._value = this.getStringTimeValue(this._maxSecondsVal);
                    this._changeDisplayValueOnly();
                }
            }
        }
        if (typeof this._value === 'number') {
            this._value = this.getStringTimeValue(this._value);
            this._changeDisplayValueOnly();
        }
        super.updateChanges();
    }
    _hasValidTimeVal() {
        return (this._value !== null && this._value !== undefined && this._value !== '');
    }
    preModelEmitHook() {
        // ? I know I could simply use just !this._value, but I want to return 0 as 
        // ? possible output value... 
        if (!this._hasValidTimeVal()) {
            return null;
        }
        if (this._returnType === 'string') {
            return this._value;
        }
        if (typeof this._value === 'number') {
            return this._value;
        }
        return this.getSecondsValue();
    }
    getSecondsValue(val) {
        if (val === undefined && this._hasValidTimeVal()) {
            val = this._value;
        }
        if (val === undefined) {
            return null;
        }
        if (typeof val === 'number') {
            return val;
        }
        let splitted = val.split(':');
        let result = 0;
        result += parseInt(splitted[0]) * 3600;
        result += parseInt(splitted[1]) * 60;
        return result;
    }
    getStringTimeValue(val) {
        if (val === undefined) {
            val = this._value;
        }
        if (val === undefined) {
            return null;
        }
        let hrNo = Math.floor(val / 3600);
        let secNo = Math.floor((val % 3600) / 60);
        let result = `00:00`;
        if (hrNo < 24 && secNo < 60) {
            let hour = `00${hrNo}`;
            let min = `00${secNo}`;
            result = `${hour.slice(hour.length - 2)}:${min.slice(min.length - 2)}`;
        }
        return result;
    }
    ngOnInit() {
        super.ngOnInit();
        this._parseInitialValue();
        this._internalEvents.subscribe(eventName => {
            switch (eventName) {
                case 'reset':
                    setTimeout(() => {
                        this._parseInitialValue();
                    });
                    break;
                default:
                    break;
            }
        });
    }
    ngOnDestroy() {
        super.ngOnDestroy();
    }
}
HandyTimeInputComponent.ɵfac = function HandyTimeInputComponent_Factory(t) { return new (t || HandyTimeInputComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControl"], 10), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_handy_ng_services__WEBPACK_IMPORTED_MODULE_3__["HandyNgUserService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_handy_form_handy_form_component__WEBPACK_IMPORTED_MODULE_4__["HandyFormComponent"], 8)); };
HandyTimeInputComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: HandyTimeInputComponent, selectors: [["handy-time-input"]], inputs: { appearance: "appearance", label: "label", placeholder: "placeholder", disabled: "disabled", prefixText: "prefixText", sufixText: "sufixText", prefixIcon: "prefixIcon", sufixIcon: "sufixIcon", debounceTime: "debounceTime", startHint: "startHint", endHint: "endHint", fieldName: "fieldName", pinningValue: "pinningValue", disableFieldPin: "disableFieldPin", min: "min", max: "max", valueType: "valueType" }, outputs: { valueChange: "valueChange", statusChange: "statusChange", prefixClick: "prefixClick", sufixClick: "sufixClick" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]], decls: 13, vars: 16, consts: [[3, "appearance"], [4, "ngIf"], ["autocomplete", "off", "matInput", "", "type", "time", 2, "text-align", "center", 3, "disabled", "ngModel", "min", "max", "placeholder", "focus", "focusout", "ngModelChange"], ["inputField", "ngModel"], ["matPrefix", "", 3, "size", "icon", "click", 4, "ngIf"], ["matSuffix", "", 3, "size", "icon", "click", 4, "ngIf"], ["mat-icon-button", "", "matSuffix", "", 3, "click", 4, "ngIf"], ["matPrefix", "", 3, "click", 4, "ngIf"], ["matSuffix", "", 3, "click", 4, "ngIf"], ["matSuffix", "", "color", "primary", "mode", "indeterminate", 3, "diameter", 4, "ngIf"], ["align", "start", 4, "ngIf"], ["align", "end", 4, "ngIf"], [3, "matTooltip", 4, "ngIf"], ["matPrefix", "", 3, "size", "icon", "click"], ["matSuffix", "", 3, "size", "icon", "click"], ["mat-icon-button", "", "matSuffix", "", 3, "click"], [3, "size", "icon"], ["matPrefix", "", 3, "click"], ["matSuffix", "", 3, "click"], ["matSuffix", "", "color", "primary", "mode", "indeterminate", 3, "diameter"], ["align", "start"], ["align", "end"], [3, "matTooltip"]], template: function HandyTimeInputComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-form-field", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, HandyTimeInputComponent_mat_label_1_Template, 2, 1, "mat-label", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "input", 2, 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("focus", function HandyTimeInputComponent_Template_input_focus_2_listener() { return ctx.onTouched(); })("focusout", function HandyTimeInputComponent_Template_input_focusout_2_listener() { return ctx.updateChanges(true); })("ngModelChange", function HandyTimeInputComponent_Template_input_ngModelChange_2_listener($event) { return ctx._value = $event; })("ngModelChange", function HandyTimeInputComponent_Template_input_ngModelChange_2_listener() { return ctx.updateChanges(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, HandyTimeInputComponent_handy_icon_4_Template, 1, 2, "handy-icon", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, HandyTimeInputComponent_handy_icon_5_Template, 1, 2, "handy-icon", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, HandyTimeInputComponent_button_6_Template, 2, 2, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, HandyTimeInputComponent_span_7_Template, 2, 1, "span", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](8, HandyTimeInputComponent_span_8_Template, 2, 1, "span", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, HandyTimeInputComponent_mat_progress_spinner_9_Template, 1, 1, "mat-progress-spinner", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](10, HandyTimeInputComponent_mat_hint_10_Template, 2, 1, "mat-hint", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, HandyTimeInputComponent_mat_hint_11_Template, 2, 1, "mat-hint", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](12, HandyTimeInputComponent_mat_error_12_Template, 3, 4, "mat-error", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("appearance", ctx._appearance);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._label);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", ctx._isDisabled)("ngModel", ctx._value)("min", ctx._minVal)("max", ctx._maxVal)("placeholder", ctx._placeholder);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._prefixIcon && ctx._fieldStatus !== "PENDING" && !ctx._pinningState);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._sufixIcon && ctx._fieldStatus !== "PENDING" && !ctx._pinningState);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._handyNgUserService.loggedInStatus && ctx._pinningState && !ctx._disableFieldPin);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._prefixText && ctx._fieldStatus !== "PENDING" && !ctx._pinningState);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._sufixText && ctx._fieldStatus !== "PENDING" && !ctx._pinningState);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._fieldStatus === "PENDING" && !ctx._pinningState);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._startHint);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._endHint);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._fieldErr);
    } }, directives: [_angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__["MatFormField"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["NgIf"], _angular_material_input__WEBPACK_IMPORTED_MODULE_7__["MatInput"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgModel"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__["MatLabel"], _modules_shared_components_handy_icon_handy_icon_component__WEBPACK_IMPORTED_MODULE_8__["HandyIconComponent"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__["MatPrefix"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__["MatSuffix"], _angular_material_button__WEBPACK_IMPORTED_MODULE_9__["MatButton"], _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_10__["MatProgressSpinner"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__["MatHint"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__["MatError"], _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_11__["MatTooltip"]], pipes: [_handy_ng_pipes_truncate_pipe__WEBPACK_IMPORTED_MODULE_12__["TruncatePipe"]], styles: ["[_nghost-%COMP%] {\n  display: block;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvaGFuZHkvbW9kdWxlcy9oYW5keS1mb3JtL2NvbXBvbmVudHMvaGFuZHktdGltZS1pbnB1dC9oYW5keS10aW1lLWlucHV0LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsY0FBQTtBQUNGIiwiZmlsZSI6InNyYy9hcHAvaGFuZHkvbW9kdWxlcy9oYW5keS1mb3JtL2NvbXBvbmVudHMvaGFuZHktdGltZS1pbnB1dC9oYW5keS10aW1lLWlucHV0LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3Qge1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG59XHJcbiJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](HandyTimeInputComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'handy-time-input',
                templateUrl: './handy-time-input.component.html',
                styleUrls: ['./handy-time-input.component.scss'],
                inputs: [
                    'appearance', 'label', 'placeholder', 'disabled',
                    'prefixText', 'sufixText', 'prefixIcon',
                    'sufixIcon',
                    'debounceTime', 'startHint', 'endHint', 'fieldName',
                    'pinningValue', 'disableFieldPin', 'min', 'max', 'valueType'
                ],
                outputs: [
                    'valueChange', 'statusChange', 'prefixClick', 'sufixClick'
                ]
            }]
    }], function () { return [{ type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControl"], decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
            }, {
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Self"]
            }] }, { type: _handy_ng_services__WEBPACK_IMPORTED_MODULE_3__["HandyNgUserService"] }, { type: _handy_form_handy_form_component__WEBPACK_IMPORTED_MODULE_4__["HandyFormComponent"], decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
            }] }]; }, { min: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], max: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], valueType: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }] }); })();


/***/ }),

/***/ "./src/app/handy/modules/handy-form/components/password-hint/password-hint.component.ts":
/*!**********************************************************************************************!*\
  !*** ./src/app/handy/modules/handy-form/components/password-hint/password-hint.component.ts ***!
  \**********************************************************************************************/
/*! exports provided: PasswordHintComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PasswordHintComponent", function() { return PasswordHintComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _handy_ng_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @handy-ng/services */ "./src/app/handy/services/index.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _modules_shared_components_buttons_icon_btn_icon_btn_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../modules/shared/components/buttons/icon-btn/icon-btn.component */ "./src/app/modules/shared/components/buttons/icon-btn/icon-btn.component.ts");
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/tooltip */ "./node_modules/@angular/material/fesm2015/tooltip.js");
/* harmony import */ var _modules_shared_components_handy_icon_handy_icon_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../modules/shared/components/handy-icon/handy-icon.component */ "./src/app/modules/shared/components/handy-icon/handy-icon.component.ts");







function PasswordHintComponent_icon_btn_2_Template(rf, ctx) { if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "icon-btn", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function PasswordHintComponent_icon_btn_2_Template_icon_btn_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r3); const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r2.generatePassword(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function PasswordHintComponent_div_4_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "span", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "handy-icon", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const hint_r5 = ctx.$implicit;
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("color", ctx_r4.parsedPasswordStrengt.guides[hint_r5] ? "primary" : "warn")("icon", ctx_r4.parsedPasswordStrengt.guides[hint_r5] ? "check_circle" : "error");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r4.passwordHintsDictionary[hint_r5], " ");
} }
function PasswordHintComponent_div_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, PasswordHintComponent_div_4_ng_container_1_Template, 4, 3, "ng-container", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r1.passwordIndicatorsList);
} }
class PasswordHintComponent {
    constructor(handyNgUtilsService) {
        this.handyNgUtilsService = handyNgUtilsService;
        this.parsedPasswordStrengt = this.handyNgUtilsService.getPasswordStrength(null);
        this.passwordIndicatorsList = Object.keys(this.parsedPasswordStrengt.guides);
        this._passwordIndicatorsLen = this.passwordIndicatorsList.length;
        this.passwordHintsDictionary = {
            length: '8+ charactes long',
            digit: 'Digit',
            upperCase: 'Upper case letter',
            lowerCase: 'Lower case letter',
            specialChar: `Special character from "${this.handyNgUtilsService.specialCharsList.join('')}"`,
            space: 'Empty space'
        };
        this._showPasswordHelp = false;
        this._disablePasswordGenerator = false;
        this.generatedPasswordEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    set passwordStrengthHelp(strength) {
        if (!strength) {
            this.parsedPasswordStrengt = this.handyNgUtilsService.getPasswordStrength(null);
        }
        this.parsedPasswordStrengt = strength;
        let newPasswordIndicatorsOrder = [];
        for (let i = 0; i < this._passwordIndicatorsLen; i++) {
            const singleIndicatorName = this.passwordIndicatorsList[i];
            if (this.parsedPasswordStrengt.guides[singleIndicatorName]) {
                newPasswordIndicatorsOrder.push(singleIndicatorName);
                continue;
            }
            newPasswordIndicatorsOrder.unshift(singleIndicatorName);
        }
        this.passwordIndicatorsList = newPasswordIndicatorsOrder;
    }
    set showPasswordHelp(show) {
        this._showPasswordHelp = show;
    }
    set disablePasswordGenerator(show) {
        this._disablePasswordGenerator = show;
    }
    generatePassword() {
        this.generatedPasswordEvent.emit(this.handyNgUtilsService.generateStrongPassword());
    }
    ngOnInit() {
    }
}
PasswordHintComponent.ɵfac = function PasswordHintComponent_Factory(t) { return new (t || PasswordHintComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_handy_ng_services__WEBPACK_IMPORTED_MODULE_1__["HandyNgUtilsService"])); };
PasswordHintComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: PasswordHintComponent, selectors: [["password-hint"]], inputs: { passwordStrengthHelp: ["passwordStrengt", "passwordStrengthHelp"], showPasswordHelp: ["showHelp", "showPasswordHelp"], disablePasswordGenerator: "disablePasswordGenerator" }, outputs: { generatedPasswordEvent: "generatedPassword" }, decls: 5, vars: 3, consts: [[1, "password-strength-wrapper"], ["icon", "casino", "matTooltip", "Generate strong password", 3, "click", 4, "ngIf"], ["icon", "help", "matTooltip", "Password help", 3, "click"], [4, "ngIf"], ["icon", "casino", "matTooltip", "Generate strong password", 3, "click"], [4, "ngFor", "ngForOf"], [2, "display", "flex"], [3, "color", "icon"]], template: function PasswordHintComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, PasswordHintComponent_icon_btn_2_Template, 1, 0, "icon-btn", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "icon-btn", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function PasswordHintComponent_Template_icon_btn_click_3_listener() { return ctx.showPasswordHelp = !ctx._showPasswordHelp; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, PasswordHintComponent_div_4_Template, 2, 1, "div", 3);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" Password strength ", ctx.parsedPasswordStrengt.points, "/100 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx._disablePasswordGenerator);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._showPasswordHelp);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["NgIf"], _modules_shared_components_buttons_icon_btn_icon_btn_component__WEBPACK_IMPORTED_MODULE_3__["IconBtnComponent"], _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_4__["MatTooltip"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgForOf"], _modules_shared_components_handy_icon_handy_icon_component__WEBPACK_IMPORTED_MODULE_5__["HandyIconComponent"]], styles: ["[_nghost-%COMP%] {\n  display: block;\n}\n\n.password-strength-wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvaGFuZHkvbW9kdWxlcy9oYW5keS1mb3JtL2NvbXBvbmVudHMvcGFzc3dvcmQtaGludC9wYXNzd29yZC1oaW50LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsY0FBQTtBQUNGOztBQUVBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0FBQ0YiLCJmaWxlIjoic3JjL2FwcC9oYW5keS9tb2R1bGVzL2hhbmR5LWZvcm0vY29tcG9uZW50cy9wYXNzd29yZC1oaW50L3Bhc3N3b3JkLWhpbnQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdCB7XHJcbiAgZGlzcGxheTogYmxvY2s7XHJcbn1cclxuXHJcbi5wYXNzd29yZC1zdHJlbmd0aC13cmFwcGVyIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbn1cclxuIl19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PasswordHintComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'password-hint',
                templateUrl: './password-hint.component.html',
                styleUrls: ['./password-hint.component.scss']
            }]
    }], function () { return [{ type: _handy_ng_services__WEBPACK_IMPORTED_MODULE_1__["HandyNgUtilsService"] }]; }, { passwordStrengthHelp: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
            args: ['passwordStrengt']
        }], showPasswordHelp: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
            args: ['showHelp']
        }], disablePasswordGenerator: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
            args: ['disablePasswordGenerator']
        }], generatedPasswordEvent: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"],
            args: ['generatedPassword']
        }] }); })();


/***/ }),

/***/ "./src/app/handy/modules/handy-form/directives/file-upload.directive.ts":
/*!******************************************************************************!*\
  !*** ./src/app/handy/modules/handy-form/directives/file-upload.directive.ts ***!
  \******************************************************************************/
/*! exports provided: FileUploadDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FileUploadDirective", function() { return FileUploadDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var mime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mime */ "./node_modules/mime/index.js");
/* harmony import */ var mime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mime__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _handy_ng_services__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @handy-ng/services */ "./src/app/handy/services/index.ts");





class FileUploadDirective {
    constructor(_renderer, _parentElm, _handyNgUtilsService, _handyNgApiService, _handyNgUserService, _handyNgConfigService) {
        this._renderer = _renderer;
        this._parentElm = _parentElm;
        this._handyNgUtilsService = _handyNgUtilsService;
        this._handyNgApiService = _handyNgApiService;
        this._handyNgUserService = _handyNgUserService;
        this._handyNgConfigService = _handyNgConfigService;
        this._files = [];
        this._multiple = false;
        this.allowedFileTypes = this._handyNgConfigService.data.fileUpload.allowedFileTypes;
        this._maxFiles = 1;
        this.generatlUploadEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.progressEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.uploadStartedEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.uploadFinishedEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.dragEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this._disabled = false;
        this._dragOver = false;
        this._uploadProgress = [];
        this._uploadSizeLimit = this._handyNgConfigService.data.fileUpload.maxFileSizeInMB * 1024 * 1024;
    }
    set maxFiles(maxFiles) {
        this._maxFiles = maxFiles;
        this._multiple = this._maxFiles > 1;
        if (this._fileInput) {
            if (this._maxFiles > 1) {
                this._multiple = true;
                this._renderer.setAttribute(this._fileInput, 'multiple', 'true');
                return;
            }
            this._multiple = false;
            this._renderer.removeAttribute(this._fileInput, 'multiple');
        }
    }
    set disabled(disabled) {
        this._disabled = disabled;
    }
    set disabledUpload(disabled) {
        this._disabled = disabled;
    }
    get disabled() {
        return this._disabled;
    }
    ngOnInit() {
        this._createFileInput();
        setTimeout(() => {
            this._handleDragEventSub();
        });
    }
    _handleDragEventSub() {
        this._dragEventSub = this.dragEvent.subscribe(event => {
            if (event === 'enter') {
                this._dragOver = true;
                if (this.dragOverClass) {
                    this._renderer.addClass(this._parentElm.nativeElement, this.dragOverClass);
                }
            }
            if (event === 'leave' || event === 'drop') {
                this._dragOver = false;
                if (this.dragOverClass) {
                    this._renderer.removeClass(this._parentElm.nativeElement, this.dragOverClass);
                }
            }
        });
    }
    _createFileInput() {
        if (this._handyNgConfigService.isPlatform('server')) {
            return;
        }
        let uploadId = this._handyNgUtilsService.generateHash({ emptySpace: false, specialChars: false });
        let tempInput = this._renderer.createElement('input');
        this._renderer.setStyle(tempInput, 'display', 'none');
        this._renderer.setAttribute(tempInput, 'type', 'file');
        this._renderer.setAttribute(tempInput, 'id', uploadId);
        this._renderer.setAttribute(tempInput, 'accept', this._getAcceptAttrString());
        if (this._multiple) {
            this._renderer.setAttribute(tempInput, 'multiple', 'true');
        }
        this._renderer.appendChild(this._parentElm.nativeElement, tempInput);
        this._fileInput = document.getElementById(uploadId);
        this._addChangeEventListener();
    }
    _getAcceptAttrString() {
        let result = '';
        let accepted = (Array.isArray(this.allowedFileTypes)) ? this.allowedFileTypes : [this.allowedFileTypes];
        let acceptedLen = accepted.length;
        let sanitizedAccepted = [];
        for (let i = 0; i < acceptedLen; i++) {
            const singleAccepted = accepted[i];
            if (this._handyNgConfigService.data.fileUpload.allowedFileTypes.includes(singleAccepted)) {
                result += `.${singleAccepted},`;
                sanitizedAccepted.push(singleAccepted);
            }
            else {
                console.error(`Upload of ${singleAccepted} files are not supported`);
            }
        }
        this.allowedFileTypes = sanitizedAccepted;
        if (result.endsWith(',')) {
            result = this._handyNgUtilsService.replaceLastCharOfString(result);
        }
        return result;
    }
    _addChangeEventListener() {
        this._fileInput.addEventListener('change', (event) => {
            let { files = [] } = event.target;
            this.setFilesAndUpload(files);
        });
    }
    _uploadFile(file) {
        let fileType = this._getFileType(file);
        this._uploadProgress.push({
            _id: null,
            progress: 0,
            finished: false,
            error: null,
            fileType: fileType,
            originalFileName: file.name,
            url: null
        });
        let index = this._uploadProgress.length - 1;
        if (this._uploadSizeLimit < file.size) {
            let error = `File is too large. Limit is ${this._handyNgConfigService.data.fileUpload.maxFileSizeInMB}MB`;
            this._handyNgUserService.notify.errNotification({
                headline: `${file.name} upload failed`,
                msg: error
            });
            this._uploadProgress[index].progress = 100;
            this._uploadProgress[index].error = error;
            this._uploadProgress[index].finished = true;
            this._triggerProgressEvent();
            return;
        }
        if (!this.allowedFileTypes.includes(fileType)) {
            let error = `"${fileType}" files are not supported`;
            this._handyNgUserService.notify.errNotification({
                headline: `${file.name} upload failed`,
                msg: error
            });
            this._uploadProgress[index].progress = 100;
            this._uploadProgress[index].error = error;
            this._uploadProgress[index].finished = true;
            this._triggerProgressEvent();
            return;
        }
        if (fileType === 'unknown') {
            let error = `Unknown file type`;
            this._handyNgUserService.notify.errNotification({
                headline: `${file.name} upload failed`,
                msg: error
            });
            this._uploadProgress[index].progress = 100;
            this._uploadProgress[index].error = error;
            this._uploadProgress[index].finished = true;
            this._triggerProgressEvent();
            return;
        }
        this._handyNgApiService.fileUpload(file, fileType, this.accessRules, this.thumbs).subscribe(uploadEvent => {
            let eventType = uploadEvent['type'];
            if (eventType === _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpEventType"].UploadProgress) {
                this._uploadProgress[index].progress = Math.round(uploadEvent['loaded'] / uploadEvent['total'] * 100);
                this._triggerProgressEvent();
            }
            if (eventType === _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpEventType"].Response) {
                let { fileType, _id, url, originalFileName, thumbs } = uploadEvent['body'].data;
                this._uploadProgress[index].fileType = fileType;
                this._uploadProgress[index]._id = _id;
                this._uploadProgress[index].url = url;
                this._uploadProgress[index].originalFileName = originalFileName;
                this._uploadProgress[index].thumbs = thumbs;
                this._uploadProgress[index].progress = 100;
                this._uploadProgress[index].finished = true;
                this._triggerProgressEvent();
            }
        }, err => {
            this._handyNgUserService.notify.apiErrNotification(err);
            this._uploadProgress[index].progress = 100;
            this._uploadProgress[index].finished = true;
            this._uploadProgress[index].error = 'Server error';
            this._triggerProgressEvent();
        });
    }
    _startUpload() {
        let filesLen = this._files.length;
        // ? Looks stupid, but blocks from acidental drop of uploaded thumb.... 
        if (filesLen < 1) {
            return;
        }
        if (filesLen > this._maxFiles) {
            this._handyNgUserService.notify.errNotification({
                headline: 'Max files limit',
                msg: `You can upload max ${this._maxFiles} file${(this._maxFiles > 1) ? 's' : ''}`
            });
            this._resetUpload();
            return;
        }
        for (let i = 0; i < filesLen; i++) {
            const singleFile = this._files[i];
            this._uploadFile(singleFile);
        }
        this.generatlUploadEvent.emit({
            type: 'start',
            finished: false,
            files: this._uploadProgress
        });
        this.uploadStartedEvent.emit(this._uploadProgress);
    }
    _getFileType(file) {
        let mimetype = (file.type) ? file.type : mime__WEBPACK_IMPORTED_MODULE_1__["getType"](file.name);
        let ext;
        if (mimetype) {
            ext = mime__WEBPACK_IMPORTED_MODULE_1__["getExtension"](mimetype);
        }
        if (ext) {
            return ext;
        }
        return 'unknown';
    }
    triggerUploadDialog() {
        if (this._handyNgConfigService.isPlatform('server') || this._fileInput === undefined || this._disabled) {
            return;
        }
        let event = new MouseEvent('click');
        this._fileInput.dispatchEvent(event);
    }
    setFilesAndUpload(files = []) {
        if (this.disabled) {
            return;
        }
        if (this._files.length > 0) {
            this._handyNgUserService.notify.errNotification({
                headline: `Previous upload hasn't finished yet`,
                msg: 'You can repeat upload after the previous upload is finished'
            });
            return;
        }
        this._files = files;
        this._startUpload();
    }
    _triggerProgressEvent() {
        let filesLen = this._uploadProgress.length;
        let finished = filesLen > 0;
        for (let i = 0; i < filesLen; i++) {
            const singleFile = this._uploadProgress[i];
            if (!singleFile.finished) {
                finished = false;
                break;
            }
        }
        this.progressEvent.emit({
            finished,
            files: this._uploadProgress
        });
        this.generatlUploadEvent.emit({
            type: 'progress',
            finished,
            files: this._uploadProgress
        });
        if (finished) {
            this._triggerUploadFinishEvent();
        }
    }
    _triggerUploadFinishEvent() {
        let hasErr = false;
        let filesLen = this._uploadProgress.length;
        for (let i = 0; i < filesLen; i++) {
            const singleFile = this._uploadProgress[i];
            if (singleFile.error) {
                hasErr = true;
                break;
            }
        }
        this.generatlUploadEvent.emit({
            type: 'finish',
            finished: true,
            files: this._uploadProgress
        });
        this.uploadFinishedEvent.emit(this._uploadProgress);
        this._resetUpload();
        if (!hasErr) {
            this._handyNgUserService.notify.simpleMsgNotification({
                headline: 'Upload finished'
            });
        }
    }
    _resetUpload() {
        this._createFileInput();
        this._uploadProgress = [];
        this._files = [];
    }
    hostClick() {
        if (this._disabled) {
            return;
        }
        this.triggerUploadDialog();
    }
    filesDrop($event) {
        $event.preventDefault();
        if (this._disabled) {
            return;
        }
        this.dragEvent.emit('drop');
        this.dragEvent.emit('leave');
        this._files = $event.dataTransfer.files;
        this._startUpload();
    }
    dragOver($event) {
        $event.preventDefault();
        if (this._disabled) {
            return;
        }
        if (!this._dragOver) {
            this.dragEvent.emit('enter');
        }
    }
    dragLeave($event) {
        if (this._dragOver) {
            this.dragEvent.emit('leave');
        }
    }
    ngOnDestroy() {
        this._handyNgUtilsService.unsubscribeAll([
            this._dragEventSub
        ]);
    }
}
FileUploadDirective.ɵfac = function FileUploadDirective_Factory(t) { return new (t || FileUploadDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_handy_ng_services__WEBPACK_IMPORTED_MODULE_3__["HandyNgUtilsService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_handy_ng_services__WEBPACK_IMPORTED_MODULE_3__["HandyNgApiService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_handy_ng_services__WEBPACK_IMPORTED_MODULE_3__["HandyNgUserService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_handy_ng_services__WEBPACK_IMPORTED_MODULE_3__["HandyNgConfigService"])); };
FileUploadDirective.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({ type: FileUploadDirective, selectors: [["", "fileUpload", ""]], hostBindings: function FileUploadDirective_HostBindings(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function FileUploadDirective_click_HostBindingHandler($event) { return ctx.hostClick($event.target); })("drop", function FileUploadDirective_drop_HostBindingHandler($event) { return ctx.filesDrop($event); })("dragover", function FileUploadDirective_dragover_HostBindingHandler($event) { return ctx.dragOver($event); })("dragleave", function FileUploadDirective_dragleave_HostBindingHandler($event) { return ctx.dragLeave($event); });
    } }, inputs: { allowedFileTypes: "allowedFileTypes", thumbs: "thumbs", accessRules: "accessRules", maxFiles: "maxFiles", dragOverClass: "dragOverClass", disabled: "disabled", disabledUpload: "disabledUpload" }, outputs: { generatlUploadEvent: "uploadEvent", progressEvent: "uploadProgress", uploadStartedEvent: "uploadStart", uploadFinishedEvent: "uploadFinished", dragEvent: "dragEvent" }, exportAs: ["fileUpload"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](FileUploadDirective, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"],
        args: [{
                selector: '[fileUpload]',
                exportAs: 'fileUpload',
            }]
    }], function () { return [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"] }, { type: _handy_ng_services__WEBPACK_IMPORTED_MODULE_3__["HandyNgUtilsService"] }, { type: _handy_ng_services__WEBPACK_IMPORTED_MODULE_3__["HandyNgApiService"] }, { type: _handy_ng_services__WEBPACK_IMPORTED_MODULE_3__["HandyNgUserService"] }, { type: _handy_ng_services__WEBPACK_IMPORTED_MODULE_3__["HandyNgConfigService"] }]; }, { allowedFileTypes: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
            args: ['allowedFileTypes']
        }], thumbs: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
            args: ['thumbs']
        }], accessRules: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
            args: ['accessRules']
        }], maxFiles: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
            args: ['maxFiles']
        }], generatlUploadEvent: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"],
            args: ['uploadEvent']
        }], progressEvent: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"],
            args: ['uploadProgress']
        }], uploadStartedEvent: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"],
            args: ['uploadStart']
        }], uploadFinishedEvent: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"],
            args: ['uploadFinished']
        }], dragEvent: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"],
            args: ['dragEvent']
        }], dragOverClass: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
            args: ['dragOverClass']
        }], disabled: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
            args: ['disabled']
        }], disabledUpload: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
            args: ['disabledUpload']
        }], hostClick: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"],
            args: ['click', ['$event.target']]
        }], filesDrop: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"],
            args: ['drop', ['$event']]
        }], dragOver: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"],
            args: ['dragover', ['$event']]
        }], dragLeave: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"],
            args: ['dragleave', ['$event']]
        }] }); })();


/***/ }),

/***/ "./src/app/handy/modules/handy-form/directives/upload-drag.directive.ts":
/*!******************************************************************************!*\
  !*** ./src/app/handy/modules/handy-form/directives/upload-drag.directive.ts ***!
  \******************************************************************************/
/*! exports provided: UploadDragDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UploadDragDirective", function() { return UploadDragDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _handy_ng_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @handy-ng/services */ "./src/app/handy/services/index.ts");



class UploadDragDirective {
    constructor(_renderer, _parentElm, _handyNgUtilsService) {
        this._renderer = _renderer;
        this._parentElm = _parentElm;
        this._handyNgUtilsService = _handyNgUtilsService;
        this.filesDrop = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.dragEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this._dragOver = false;
        this._disabled = false;
    }
    set disabledUpload(disabled) {
        this._disabled = disabled;
    }
    ngOnInit() {
        if (this._finalListener) {
            this._disabledCheckInterval = setInterval(() => {
                this.disabledUpload = this._finalListener.disabled;
            }, 500);
        }
        this._handleDragEventSub();
    }
    _handleDragEventSub() {
        this._dragEventSub = this.dragEvent.subscribe(event => {
            if (event === 'enter') {
                this._dragOver = true;
                if (this.dragOverClass) {
                    this._renderer.addClass(this._parentElm.nativeElement, this.dragOverClass);
                }
            }
            if (event === 'leave' || event === 'drop') {
                this._dragOver = false;
                if (this.dragOverClass) {
                    this._renderer.removeClass(this._parentElm.nativeElement, this.dragOverClass);
                }
            }
        });
    }
    filesDroped($event) {
        $event.preventDefault();
        if (this._disabled) {
            return;
        }
        let files = $event.dataTransfer.files;
        this.filesDrop.emit(files);
        this.dragEvent.emit('drop');
        if (this._finalListener) {
            this._finalListener.setFilesAndUpload(files);
        }
    }
    dragOver($event) {
        $event.preventDefault();
        if (this._disabled) {
            return;
        }
        if (!this._dragOver) {
            this.dragEvent.emit('enter');
        }
    }
    dragLeave($event) {
        if (this._dragOver) {
            this.dragEvent.emit('leave');
        }
    }
    ngOnDestroy() {
        this._handyNgUtilsService.unsubscribeAll([
            this._dragEventSub
        ]);
        if (this._disabledCheckInterval) {
            clearInterval(this._disabledCheckInterval);
        }
    }
}
UploadDragDirective.ɵfac = function UploadDragDirective_Factory(t) { return new (t || UploadDragDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_handy_ng_services__WEBPACK_IMPORTED_MODULE_1__["HandyNgUtilsService"])); };
UploadDragDirective.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({ type: UploadDragDirective, selectors: [["", "uploadDrag", ""]], hostBindings: function UploadDragDirective_HostBindings(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("drop", function UploadDragDirective_drop_HostBindingHandler($event) { return ctx.filesDroped($event); })("dragover", function UploadDragDirective_dragover_HostBindingHandler($event) { return ctx.dragOver($event); })("dragleave", function UploadDragDirective_dragleave_HostBindingHandler($event) { return ctx.dragLeave($event); });
    } }, inputs: { _finalListener: ["uploadHandler", "_finalListener"], dragOverClass: "dragOverClass", disabledUpload: "disabledUpload" }, outputs: { filesDrop: "filesDrop", dragEvent: "dragEvent" } });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](UploadDragDirective, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"],
        args: [{
                selector: '[uploadDrag]'
            }]
    }], function () { return [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"] }, { type: _handy_ng_services__WEBPACK_IMPORTED_MODULE_1__["HandyNgUtilsService"] }]; }, { filesDrop: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"],
            args: ['filesDrop']
        }], dragEvent: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"],
            args: ['dragEvent']
        }], _finalListener: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
            args: ['uploadHandler']
        }], dragOverClass: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
            args: ['dragOverClass']
        }], disabledUpload: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
            args: ['disabledUpload']
        }], filesDroped: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"],
            args: ['drop', ['$event']]
        }], dragOver: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"],
            args: ['dragover', ['$event']]
        }], dragLeave: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"],
            args: ['dragleave', ['$event']]
        }] }); })();


/***/ }),

/***/ "./src/app/handy/modules/handy-form/handy-form.module.ts":
/*!***************************************************************!*\
  !*** ./src/app/handy/modules/handy-form/handy-form.module.ts ***!
  \***************************************************************/
/*! exports provided: HandyFormModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HandyFormModule", function() { return HandyFormModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _components_handy_form_handy_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/handy-form/handy-form.component */ "./src/app/handy/modules/handy-form/components/handy-form/handy-form.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _components_handy_text_input_handy_text_input_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/handy-text-input/handy-text-input.component */ "./src/app/handy/modules/handy-form/components/handy-text-input/handy-text-input.component.ts");
/* harmony import */ var _components_handy_password_input_handy_password_input_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/handy-password-input/handy-password-input.component */ "./src/app/handy/modules/handy-form/components/handy-password-input/handy-password-input.component.ts");
/* harmony import */ var _components_handy_number_input_handy_number_input_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/handy-number-input/handy-number-input.component */ "./src/app/handy/modules/handy-form/components/handy-number-input/handy-number-input.component.ts");
/* harmony import */ var _components_handy_textarea_input_handy_textarea_input_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/handy-textarea-input/handy-textarea-input.component */ "./src/app/handy/modules/handy-form/components/handy-textarea-input/handy-textarea-input.component.ts");
/* harmony import */ var _components_handy_select_input_handy_select_input_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/handy-select-input/handy-select-input.component */ "./src/app/handy/modules/handy-form/components/handy-select-input/handy-select-input.component.ts");
/* harmony import */ var _components_handy_multi_select_input_handy_multi_select_input_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/handy-multi-select-input/handy-multi-select-input.component */ "./src/app/handy/modules/handy-form/components/handy-multi-select-input/handy-multi-select-input.component.ts");
/* harmony import */ var _components_handy_radio_group_input_handy_radio_group_input_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/handy-radio-group-input/handy-radio-group-input.component */ "./src/app/handy/modules/handy-form/components/handy-radio-group-input/handy-radio-group-input.component.ts");
/* harmony import */ var _components_handy_check_box_input_handy_check_box_input_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/handy-check-box-input/handy-check-box-input.component */ "./src/app/handy/modules/handy-form/components/handy-check-box-input/handy-check-box-input.component.ts");
/* harmony import */ var _components_handy_slide_toggle_input_handy_slide_toggle_input_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./components/handy-slide-toggle-input/handy-slide-toggle-input.component */ "./src/app/handy/modules/handy-form/components/handy-slide-toggle-input/handy-slide-toggle-input.component.ts");
/* harmony import */ var _components_handy_slider_input_handy_slider_input_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./components/handy-slider-input/handy-slider-input.component */ "./src/app/handy/modules/handy-form/components/handy-slider-input/handy-slider-input.component.ts");
/* harmony import */ var _components_handy_date_input_handy_date_input_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./components/handy-date-input/handy-date-input.component */ "./src/app/handy/modules/handy-form/components/handy-date-input/handy-date-input.component.ts");
/* harmony import */ var _components_handy_date_input_input_calendar_input_calendar_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./components/handy-date-input/input-calendar/input-calendar.component */ "./src/app/handy/modules/handy-form/components/handy-date-input/input-calendar/input-calendar.component.ts");
/* harmony import */ var _components_handy_time_input_handy_time_input_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./components/handy-time-input/handy-time-input.component */ "./src/app/handy/modules/handy-form/components/handy-time-input/handy-time-input.component.ts");
/* harmony import */ var _components_handy_date_range_input_handy_date_range_input_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./components/handy-date-range-input/handy-date-range-input.component */ "./src/app/handy/modules/handy-form/components/handy-date-range-input/handy-date-range-input.component.ts");
/* harmony import */ var ngx_quill__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ngx-quill */ "./node_modules/ngx-quill/fesm2015/ngx-quill.js");
/* harmony import */ var _components_handy_rte_input_handy_rte_input_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./components/handy-rte-input/handy-rte-input.component */ "./src/app/handy/modules/handy-form/components/handy-rte-input/handy-rte-input.component.ts");
/* harmony import */ var src_app_modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! src/app/modules/shared/shared.module */ "./src/app/modules/shared/shared.module.ts");
/* harmony import */ var _validators__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./validators */ "./src/app/handy/modules/handy-form/validators/index.ts");
/* harmony import */ var _components_password_hint_password_hint_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./components/password-hint/password-hint.component */ "./src/app/handy/modules/handy-form/components/password-hint/password-hint.component.ts");
/* harmony import */ var _directives_file_upload_directive__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./directives/file-upload.directive */ "./src/app/handy/modules/handy-form/directives/file-upload.directive.ts");
/* harmony import */ var _directives_upload_drag_directive__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./directives/upload-drag.directive */ "./src/app/handy/modules/handy-form/directives/upload-drag.directive.ts");
/* harmony import */ var _components_handy_file_input_handy_file_input_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./components/handy-file-input/handy-file-input.component */ "./src/app/handy/modules/handy-form/components/handy-file-input/handy-file-input.component.ts");
/* harmony import */ var _components_handy_irl_county_select_input_handy_irl_county_select_input__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./components/handy-irl-county-select-input/handy-irl-county-select-input */ "./src/app/handy/modules/handy-form/components/handy-irl-county-select-input/handy-irl-county-select-input.ts");
/* harmony import */ var _components_form_caption_form_caption_component__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./components/form-caption/form-caption.component */ "./src/app/handy/modules/handy-form/components/form-caption/form-caption.component.ts");
/* harmony import */ var _components_form_divider_form_divider_component__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./components/form-divider/form-divider.component */ "./src/app/handy/modules/handy-form/components/form-divider/form-divider.component.ts");
/* harmony import */ var _components_form_caption_divider_form_caption_divider_component__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./components/form-caption-divider/form-caption-divider.component */ "./src/app/handy/modules/handy-form/components/form-caption-divider/form-caption-divider.component.ts");
/* harmony import */ var _components_handy_custom_file_input_handy_custom_file_input_component__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./components/handy-custom-file-input/handy-custom-file-input.component */ "./src/app/handy/modules/handy-form/components/handy-custom-file-input/handy-custom-file-input.component.ts");
/* harmony import */ var _components_handy_chip_input_handy_chip_input_component__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./components/handy-chip-input/handy-chip-input.component */ "./src/app/handy/modules/handy-form/components/handy-chip-input/handy-chip-input.component.ts");
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! @angular/material/toolbar */ "./node_modules/@angular/material/fesm2015/toolbar.js");
/* harmony import */ var _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! @angular/cdk/bidi */ "./node_modules/@angular/cdk/fesm2015/bidi.js");
/* harmony import */ var _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! @angular/cdk/scrolling */ "./node_modules/@angular/cdk/fesm2015/scrolling.js");
/* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! @angular/material/sidenav */ "./node_modules/@angular/material/fesm2015/sidenav.js");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! @angular/material/icon */ "./node_modules/@angular/material/fesm2015/icon.js");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! @angular/material/core */ "./node_modules/@angular/material/fesm2015/core.js");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/fesm2015/button.js");
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! @angular/material/tooltip */ "./node_modules/@angular/material/fesm2015/tooltip.js");
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! @angular/material/list */ "./node_modules/@angular/material/fesm2015/list.js");
/* harmony import */ var _angular_material_divider__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! @angular/material/divider */ "./node_modules/@angular/material/fesm2015/divider.js");
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! @angular/material/menu */ "./node_modules/@angular/material/fesm2015/menu.js");
/* harmony import */ var _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! @angular/material/slide-toggle */ "./node_modules/@angular/material/fesm2015/slide-toggle.js");
/* harmony import */ var _angular_material_badge__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! @angular/material/badge */ "./node_modules/@angular/material/fesm2015/badge.js");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! @angular/material/form-field */ "./node_modules/@angular/material/fesm2015/form-field.js");
/* harmony import */ var _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! @angular/cdk/text-field */ "./node_modules/@angular/cdk/fesm2015/text-field.js");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! @angular/material/input */ "./node_modules/@angular/material/fesm2015/input.js");
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! @angular/material/progress-spinner */ "./node_modules/@angular/material/fesm2015/progress-spinner.js");
/* harmony import */ var _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(/*! @angular/material/autocomplete */ "./node_modules/@angular/material/fesm2015/autocomplete.js");
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(/*! @angular/material/select */ "./node_modules/@angular/material/fesm2015/select.js");
/* harmony import */ var _angular_material_radio__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(/*! @angular/material/radio */ "./node_modules/@angular/material/fesm2015/radio.js");
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(/*! @angular/material/checkbox */ "./node_modules/@angular/material/fesm2015/checkbox.js");
/* harmony import */ var _angular_material_slider__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(/*! @angular/material/slider */ "./node_modules/@angular/material/fesm2015/slider.js");
/* harmony import */ var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__(/*! @angular/material/datepicker */ "./node_modules/@angular/material/fesm2015/datepicker.js");
/* harmony import */ var _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_55__ = __webpack_require__(/*! @angular/cdk/overlay */ "./node_modules/@angular/cdk/fesm2015/overlay.js");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_56__ = __webpack_require__(/*! @angular/material/card */ "./node_modules/@angular/material/fesm2015/card.js");
/* harmony import */ var _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_57__ = __webpack_require__(/*! @angular/material/grid-list */ "./node_modules/@angular/material/fesm2015/grid-list.js");
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_58__ = __webpack_require__(/*! @angular/material/table */ "./node_modules/@angular/material/fesm2015/table.js");
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_59__ = __webpack_require__(/*! @angular/material/paginator */ "./node_modules/@angular/material/fesm2015/paginator.js");
/* harmony import */ var _angular_material_sort__WEBPACK_IMPORTED_MODULE_60__ = __webpack_require__(/*! @angular/material/sort */ "./node_modules/@angular/material/fesm2015/sort.js");
/* harmony import */ var _angular_material_expansion__WEBPACK_IMPORTED_MODULE_61__ = __webpack_require__(/*! @angular/material/expansion */ "./node_modules/@angular/material/fesm2015/expansion.js");
/* harmony import */ var _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_62__ = __webpack_require__(/*! @angular/cdk/drag-drop */ "./node_modules/@angular/cdk/fesm2015/drag-drop.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_63__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/fesm2015/dialog.js");
/* harmony import */ var _angular_material_stepper__WEBPACK_IMPORTED_MODULE_64__ = __webpack_require__(/*! @angular/material/stepper */ "./node_modules/@angular/material/fesm2015/stepper.js");
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_65__ = __webpack_require__(/*! @angular/material/snack-bar */ "./node_modules/@angular/material/fesm2015/snack-bar.js");
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_66__ = __webpack_require__(/*! @angular/material/progress-bar */ "./node_modules/@angular/material/fesm2015/progress-bar.js");
/* harmony import */ var _angular_material_chips__WEBPACK_IMPORTED_MODULE_67__ = __webpack_require__(/*! @angular/material/chips */ "./node_modules/@angular/material/fesm2015/chips.js");
/* harmony import */ var _handy_ng_directives_dev_env_directive__WEBPACK_IMPORTED_MODULE_68__ = __webpack_require__(/*! @handy-ng/directives/dev-env.directive */ "./src/app/handy/directives/dev-env.directive.ts");
/* harmony import */ var _handy_ng_directives_stag_env_directive__WEBPACK_IMPORTED_MODULE_69__ = __webpack_require__(/*! @handy-ng/directives/stag-env.directive */ "./src/app/handy/directives/stag-env.directive.ts");
/* harmony import */ var _handy_ng_directives_prod_env_directive__WEBPACK_IMPORTED_MODULE_70__ = __webpack_require__(/*! @handy-ng/directives/prod-env.directive */ "./src/app/handy/directives/prod-env.directive.ts");
/* harmony import */ var _handy_ng_directives_is_browser_directive__WEBPACK_IMPORTED_MODULE_71__ = __webpack_require__(/*! @handy-ng/directives/is-browser.directive */ "./src/app/handy/directives/is-browser.directive.ts");
/* harmony import */ var _handy_ng_directives_is_server_directive__WEBPACK_IMPORTED_MODULE_72__ = __webpack_require__(/*! @handy-ng/directives/is-server.directive */ "./src/app/handy/directives/is-server.directive.ts");
/* harmony import */ var _handy_ng_directives_is_android_directive__WEBPACK_IMPORTED_MODULE_73__ = __webpack_require__(/*! @handy-ng/directives/is-android.directive */ "./src/app/handy/directives/is-android.directive.ts");
/* harmony import */ var _handy_ng_directives_is_ios_directive__WEBPACK_IMPORTED_MODULE_74__ = __webpack_require__(/*! @handy-ng/directives/is-ios.directive */ "./src/app/handy/directives/is-ios.directive.ts");
/* harmony import */ var _handy_ng_directives_xs_layout_directive__WEBPACK_IMPORTED_MODULE_75__ = __webpack_require__(/*! @handy-ng/directives/xs-layout.directive */ "./src/app/handy/directives/xs-layout.directive.ts");
/* harmony import */ var _handy_ng_directives_sm_layout_directive__WEBPACK_IMPORTED_MODULE_76__ = __webpack_require__(/*! @handy-ng/directives/sm-layout.directive */ "./src/app/handy/directives/sm-layout.directive.ts");
/* harmony import */ var _handy_ng_directives_md_layout_directive__WEBPACK_IMPORTED_MODULE_77__ = __webpack_require__(/*! @handy-ng/directives/md-layout.directive */ "./src/app/handy/directives/md-layout.directive.ts");
/* harmony import */ var _handy_ng_directives_lg_layout_directive__WEBPACK_IMPORTED_MODULE_78__ = __webpack_require__(/*! @handy-ng/directives/lg-layout.directive */ "./src/app/handy/directives/lg-layout.directive.ts");
/* harmony import */ var _handy_ng_directives_xl_layout_directive__WEBPACK_IMPORTED_MODULE_79__ = __webpack_require__(/*! @handy-ng/directives/xl-layout.directive */ "./src/app/handy/directives/xl-layout.directive.ts");
/* harmony import */ var _handy_ng_directives_is_mobile_directive__WEBPACK_IMPORTED_MODULE_80__ = __webpack_require__(/*! @handy-ng/directives/is-mobile.directive */ "./src/app/handy/directives/is-mobile.directive.ts");
/* harmony import */ var _handy_ng_directives_is_desktop_directive__WEBPACK_IMPORTED_MODULE_81__ = __webpack_require__(/*! @handy-ng/directives/is-desktop.directive */ "./src/app/handy/directives/is-desktop.directive.ts");
/* harmony import */ var _handy_ng_directives_enviroments_only_directive__WEBPACK_IMPORTED_MODULE_82__ = __webpack_require__(/*! @handy-ng/directives/enviroments-only.directive */ "./src/app/handy/directives/enviroments-only.directive.ts");
/* harmony import */ var _handy_ng_directives_breakpoints_only_directive__WEBPACK_IMPORTED_MODULE_83__ = __webpack_require__(/*! @handy-ng/directives/breakpoints-only.directive */ "./src/app/handy/directives/breakpoints-only.directive.ts");
/* harmony import */ var _handy_ng_directives_logged_in_only_directive__WEBPACK_IMPORTED_MODULE_84__ = __webpack_require__(/*! @handy-ng/directives/logged-in-only.directive */ "./src/app/handy/directives/logged-in-only.directive.ts");
/* harmony import */ var _handy_ng_directives_roles_only_directive__WEBPACK_IMPORTED_MODULE_85__ = __webpack_require__(/*! @handy-ng/directives/roles-only.directive */ "./src/app/handy/directives/roles-only.directive.ts");
/* harmony import */ var _handy_ng_directives_permissions_only_directive__WEBPACK_IMPORTED_MODULE_86__ = __webpack_require__(/*! @handy-ng/directives/permissions-only.directive */ "./src/app/handy/directives/permissions-only.directive.ts");
/* harmony import */ var _handy_ng_directives_groups_only_directive__WEBPACK_IMPORTED_MODULE_87__ = __webpack_require__(/*! @handy-ng/directives/groups-only.directive */ "./src/app/handy/directives/groups-only.directive.ts");
/* harmony import */ var _handy_ng_directives_not_logged_in_only_directive__WEBPACK_IMPORTED_MODULE_88__ = __webpack_require__(/*! @handy-ng/directives/not-logged-in-only.directive */ "./src/app/handy/directives/not-logged-in-only.directive.ts");
/* harmony import */ var _modules_shared_components_handy_icon_handy_icon_component__WEBPACK_IMPORTED_MODULE_89__ = __webpack_require__(/*! ../../../modules/shared/components/handy-icon/handy-icon.component */ "./src/app/modules/shared/components/handy-icon/handy-icon.component.ts");
/* harmony import */ var _modules_shared_components_handy_nav_layout_components_sidenav_navigation_item_sidenav_navigation_item_component__WEBPACK_IMPORTED_MODULE_90__ = __webpack_require__(/*! ../../../modules/shared/components/handy-nav-layout/components/sidenav-navigation-item/sidenav-navigation-item.component */ "./src/app/modules/shared/components/handy-nav-layout/components/sidenav-navigation-item/sidenav-navigation-item.component.ts");
/* harmony import */ var _modules_shared_components_handy_nav_layout_handy_nav_layout_component__WEBPACK_IMPORTED_MODULE_91__ = __webpack_require__(/*! ../../../modules/shared/components/handy-nav-layout/handy-nav-layout.component */ "./src/app/modules/shared/components/handy-nav-layout/handy-nav-layout.component.ts");
/* harmony import */ var _handy_ng_directives_confirm_click_directive__WEBPACK_IMPORTED_MODULE_92__ = __webpack_require__(/*! @handy-ng/directives/confirm-click.directive */ "./src/app/handy/directives/confirm-click.directive.ts");
/* harmony import */ var _modules_shared_components_global_loader_global_loader_component__WEBPACK_IMPORTED_MODULE_93__ = __webpack_require__(/*! ../../../modules/shared/components/global-loader/global-loader.component */ "./src/app/modules/shared/components/global-loader/global-loader.component.ts");
/* harmony import */ var _modules_shared_components_buttons_basic_btn_basic_btn_component__WEBPACK_IMPORTED_MODULE_94__ = __webpack_require__(/*! ../../../modules/shared/components/buttons/basic-btn/basic-btn.component */ "./src/app/modules/shared/components/buttons/basic-btn/basic-btn.component.ts");
/* harmony import */ var _modules_shared_components_buttons_raised_btn_raised_btn_component__WEBPACK_IMPORTED_MODULE_95__ = __webpack_require__(/*! ../../../modules/shared/components/buttons/raised-btn/raised-btn.component */ "./src/app/modules/shared/components/buttons/raised-btn/raised-btn.component.ts");
/* harmony import */ var _modules_shared_components_buttons_stroked_btn_stroked_btn_component__WEBPACK_IMPORTED_MODULE_96__ = __webpack_require__(/*! ../../../modules/shared/components/buttons/stroked-btn/stroked-btn.component */ "./src/app/modules/shared/components/buttons/stroked-btn/stroked-btn.component.ts");
/* harmony import */ var _modules_shared_components_buttons_flat_btn_flat_btn_component__WEBPACK_IMPORTED_MODULE_97__ = __webpack_require__(/*! ../../../modules/shared/components/buttons/flat-btn/flat-btn.component */ "./src/app/modules/shared/components/buttons/flat-btn/flat-btn.component.ts");
/* harmony import */ var _modules_shared_components_buttons_icon_btn_icon_btn_component__WEBPACK_IMPORTED_MODULE_98__ = __webpack_require__(/*! ../../../modules/shared/components/buttons/icon-btn/icon-btn.component */ "./src/app/modules/shared/components/buttons/icon-btn/icon-btn.component.ts");
/* harmony import */ var _modules_shared_components_buttons_fab_btn_fab_btn_component__WEBPACK_IMPORTED_MODULE_99__ = __webpack_require__(/*! ../../../modules/shared/components/buttons/fab-btn/fab-btn.component */ "./src/app/modules/shared/components/buttons/fab-btn/fab-btn.component.ts");
/* harmony import */ var _modules_shared_components_buttons_mini_fab_btn_mini_fab_btn_component__WEBPACK_IMPORTED_MODULE_100__ = __webpack_require__(/*! ../../../modules/shared/components/buttons/mini-fab-btn/mini-fab-btn.component */ "./src/app/modules/shared/components/buttons/mini-fab-btn/mini-fab-btn.component.ts");
/* harmony import */ var _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_101__ = __webpack_require__(/*! @angular/flex-layout/flex */ "./node_modules/@angular/flex-layout/esm2015/flex.js");
/* harmony import */ var _angular_flex_layout_extended__WEBPACK_IMPORTED_MODULE_102__ = __webpack_require__(/*! @angular/flex-layout/extended */ "./node_modules/@angular/flex-layout/esm2015/extended.js");
/* harmony import */ var _angular_flex_layout_grid__WEBPACK_IMPORTED_MODULE_103__ = __webpack_require__(/*! @angular/flex-layout/grid */ "./node_modules/@angular/flex-layout/esm2015/grid.js");
/* harmony import */ var _modules_shared_components_form_actions_bar_form_actions_bar_component__WEBPACK_IMPORTED_MODULE_104__ = __webpack_require__(/*! ../../../modules/shared/components/form-actions-bar/form-actions-bar.component */ "./src/app/modules/shared/components/form-actions-bar/form-actions-bar.component.ts");
/* harmony import */ var _modules_shared_components_file_thumb_file_thumb_component__WEBPACK_IMPORTED_MODULE_105__ = __webpack_require__(/*! ../../../modules/shared/components/file-thumb/file-thumb.component */ "./src/app/modules/shared/components/file-thumb/file-thumb.component.ts");
/* harmony import */ var _modules_shared_components_handy_expander_handy_expander_component__WEBPACK_IMPORTED_MODULE_106__ = __webpack_require__(/*! ../../../modules/shared/components/handy-expander/handy-expander.component */ "./src/app/modules/shared/components/handy-expander/handy-expander.component.ts");
/* harmony import */ var _handy_ng_directives_copy_to_clipboard_click__WEBPACK_IMPORTED_MODULE_107__ = __webpack_require__(/*! @handy-ng/directives/copy-to-clipboard-click */ "./src/app/handy/directives/copy-to-clipboard-click.ts");
/* harmony import */ var _directives_templ_var_directive__WEBPACK_IMPORTED_MODULE_108__ = __webpack_require__(/*! ../../directives/templ-var.directive */ "./src/app/handy/directives/templ-var.directive.ts");
/* harmony import */ var _handy_ng_directives_handy_if_on_screen_directive__WEBPACK_IMPORTED_MODULE_109__ = __webpack_require__(/*! @handy-ng/directives/handy-if-on-screen.directive */ "./src/app/handy/directives/handy-if-on-screen.directive.ts");
/* harmony import */ var _handy_ng_directives_handy_delay_render_directive__WEBPACK_IMPORTED_MODULE_110__ = __webpack_require__(/*! @handy-ng/directives/handy-delay-render.directive */ "./src/app/handy/directives/handy-delay-render.directive.ts");
/* harmony import */ var _handy_ng_pipes_truncate_pipe__WEBPACK_IMPORTED_MODULE_111__ = __webpack_require__(/*! @handy-ng/pipes/truncate.pipe */ "./src/app/handy/pipes/truncate.pipe.ts");
/* harmony import */ var _handy_ng_pipes_handy_date_pipe__WEBPACK_IMPORTED_MODULE_112__ = __webpack_require__(/*! @handy-ng/pipes/handy-date.pipe */ "./src/app/handy/pipes/handy-date.pipe.ts");
/* harmony import */ var _handy_ng_pipes_handy_timezone_pipe__WEBPACK_IMPORTED_MODULE_113__ = __webpack_require__(/*! @handy-ng/pipes/handy-timezone.pipe */ "./src/app/handy/pipes/handy-timezone.pipe.ts");
/* harmony import */ var _handy_ng_pipes_handy_time_pipe__WEBPACK_IMPORTED_MODULE_114__ = __webpack_require__(/*! @handy-ng/pipes/handy-time.pipe */ "./src/app/handy/pipes/handy-time.pipe.ts");
/* harmony import */ var _handy_ng_pipes_keep_html_tags_pipe__WEBPACK_IMPORTED_MODULE_115__ = __webpack_require__(/*! @handy-ng/pipes/keep-html-tags.pipe */ "./src/app/handy/pipes/keep-html-tags.pipe.ts");
/* harmony import */ var _handy_ng_pipes_handy_eur_pipe__WEBPACK_IMPORTED_MODULE_116__ = __webpack_require__(/*! @handy-ng/pipes/handy-eur.pipe */ "./src/app/handy/pipes/handy-eur.pipe.ts");

























































































































class HandyFormModule {
}
HandyFormModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: HandyFormModule });
HandyFormModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function HandyFormModule_Factory(t) { return new (t || HandyFormModule)(); }, providers: [
        _validators__WEBPACK_IMPORTED_MODULE_21__["PasswordValidator"]
    ], imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
            src_app_modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_20__["SharedModule"],
            ngx_quill__WEBPACK_IMPORTED_MODULE_18__["QuillModule"].forRoot()
        ], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](HandyFormModule, { declarations: [_components_handy_form_handy_form_component__WEBPACK_IMPORTED_MODULE_2__["HandyFormComponent"],
        _components_handy_text_input_handy_text_input_component__WEBPACK_IMPORTED_MODULE_4__["HandyTextInputComponent"],
        _components_handy_password_input_handy_password_input_component__WEBPACK_IMPORTED_MODULE_5__["HandyPasswordInputComponent"],
        _components_handy_number_input_handy_number_input_component__WEBPACK_IMPORTED_MODULE_6__["HandyNumberInputComponent"],
        _components_handy_textarea_input_handy_textarea_input_component__WEBPACK_IMPORTED_MODULE_7__["HandyTextAreaInputComponent"],
        _components_handy_select_input_handy_select_input_component__WEBPACK_IMPORTED_MODULE_8__["HandySelectInputComponent"],
        _components_handy_multi_select_input_handy_multi_select_input_component__WEBPACK_IMPORTED_MODULE_9__["HandyMultiSelectInputComponent"],
        _components_handy_radio_group_input_handy_radio_group_input_component__WEBPACK_IMPORTED_MODULE_10__["HandyRadioGroupInputComponent"],
        _components_handy_check_box_input_handy_check_box_input_component__WEBPACK_IMPORTED_MODULE_11__["HandyCheckBoxInputComponent"],
        _components_handy_slide_toggle_input_handy_slide_toggle_input_component__WEBPACK_IMPORTED_MODULE_12__["HandySlideToggleInputComponent"],
        _components_handy_slider_input_handy_slider_input_component__WEBPACK_IMPORTED_MODULE_13__["HandySliderInputComponent"],
        _components_handy_date_input_handy_date_input_component__WEBPACK_IMPORTED_MODULE_14__["HandyDateInputComponent"],
        _components_handy_date_input_input_calendar_input_calendar_component__WEBPACK_IMPORTED_MODULE_15__["InputCalendarComponent"],
        _components_handy_time_input_handy_time_input_component__WEBPACK_IMPORTED_MODULE_16__["HandyTimeInputComponent"],
        _components_handy_date_range_input_handy_date_range_input_component__WEBPACK_IMPORTED_MODULE_17__["HandyDateRangeInputComponent"],
        _components_handy_rte_input_handy_rte_input_component__WEBPACK_IMPORTED_MODULE_19__["HandyRteInputComponent"],
        _components_password_hint_password_hint_component__WEBPACK_IMPORTED_MODULE_22__["PasswordHintComponent"],
        _directives_file_upload_directive__WEBPACK_IMPORTED_MODULE_23__["FileUploadDirective"],
        _directives_upload_drag_directive__WEBPACK_IMPORTED_MODULE_24__["UploadDragDirective"],
        _components_handy_file_input_handy_file_input_component__WEBPACK_IMPORTED_MODULE_25__["HandyFileInputComponent"],
        _components_handy_irl_county_select_input_handy_irl_county_select_input__WEBPACK_IMPORTED_MODULE_26__["HandyIrlCountySelectInputComponent"],
        _components_form_caption_form_caption_component__WEBPACK_IMPORTED_MODULE_27__["FormCaptionComponent"],
        _components_form_divider_form_divider_component__WEBPACK_IMPORTED_MODULE_28__["FormDividerComponent"],
        _components_form_caption_divider_form_caption_divider_component__WEBPACK_IMPORTED_MODULE_29__["FormCaptionDividerComponent"],
        _components_handy_custom_file_input_handy_custom_file_input_component__WEBPACK_IMPORTED_MODULE_30__["HandyCustomFileInputComponent"],
        _components_handy_chip_input_handy_chip_input_component__WEBPACK_IMPORTED_MODULE_31__["HandyChipInputComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
        src_app_modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_20__["SharedModule"], ngx_quill__WEBPACK_IMPORTED_MODULE_18__["QuillModule"]], exports: [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
        _components_handy_form_handy_form_component__WEBPACK_IMPORTED_MODULE_2__["HandyFormComponent"],
        _components_handy_text_input_handy_text_input_component__WEBPACK_IMPORTED_MODULE_4__["HandyTextInputComponent"],
        _components_handy_password_input_handy_password_input_component__WEBPACK_IMPORTED_MODULE_5__["HandyPasswordInputComponent"],
        _components_handy_number_input_handy_number_input_component__WEBPACK_IMPORTED_MODULE_6__["HandyNumberInputComponent"],
        _components_handy_textarea_input_handy_textarea_input_component__WEBPACK_IMPORTED_MODULE_7__["HandyTextAreaInputComponent"],
        _components_handy_select_input_handy_select_input_component__WEBPACK_IMPORTED_MODULE_8__["HandySelectInputComponent"],
        _components_handy_multi_select_input_handy_multi_select_input_component__WEBPACK_IMPORTED_MODULE_9__["HandyMultiSelectInputComponent"],
        _components_handy_radio_group_input_handy_radio_group_input_component__WEBPACK_IMPORTED_MODULE_10__["HandyRadioGroupInputComponent"],
        _components_handy_check_box_input_handy_check_box_input_component__WEBPACK_IMPORTED_MODULE_11__["HandyCheckBoxInputComponent"],
        _components_handy_slide_toggle_input_handy_slide_toggle_input_component__WEBPACK_IMPORTED_MODULE_12__["HandySlideToggleInputComponent"],
        _components_handy_slider_input_handy_slider_input_component__WEBPACK_IMPORTED_MODULE_13__["HandySliderInputComponent"],
        _components_handy_date_input_handy_date_input_component__WEBPACK_IMPORTED_MODULE_14__["HandyDateInputComponent"],
        _components_handy_time_input_handy_time_input_component__WEBPACK_IMPORTED_MODULE_16__["HandyTimeInputComponent"],
        _components_handy_date_range_input_handy_date_range_input_component__WEBPACK_IMPORTED_MODULE_17__["HandyDateRangeInputComponent"],
        _components_handy_rte_input_handy_rte_input_component__WEBPACK_IMPORTED_MODULE_19__["HandyRteInputComponent"],
        _components_password_hint_password_hint_component__WEBPACK_IMPORTED_MODULE_22__["PasswordHintComponent"],
        _directives_file_upload_directive__WEBPACK_IMPORTED_MODULE_23__["FileUploadDirective"],
        _directives_upload_drag_directive__WEBPACK_IMPORTED_MODULE_24__["UploadDragDirective"],
        _components_handy_file_input_handy_file_input_component__WEBPACK_IMPORTED_MODULE_25__["HandyFileInputComponent"],
        _components_handy_irl_county_select_input_handy_irl_county_select_input__WEBPACK_IMPORTED_MODULE_26__["HandyIrlCountySelectInputComponent"],
        _components_form_caption_form_caption_component__WEBPACK_IMPORTED_MODULE_27__["FormCaptionComponent"],
        _components_form_divider_form_divider_component__WEBPACK_IMPORTED_MODULE_28__["FormDividerComponent"],
        _components_form_caption_divider_form_caption_divider_component__WEBPACK_IMPORTED_MODULE_29__["FormCaptionDividerComponent"],
        _components_handy_custom_file_input_handy_custom_file_input_component__WEBPACK_IMPORTED_MODULE_30__["HandyCustomFileInputComponent"],
        _components_handy_chip_input_handy_chip_input_component__WEBPACK_IMPORTED_MODULE_31__["HandyChipInputComponent"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](HandyFormModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                declarations: [
                    _components_handy_form_handy_form_component__WEBPACK_IMPORTED_MODULE_2__["HandyFormComponent"],
                    _components_handy_text_input_handy_text_input_component__WEBPACK_IMPORTED_MODULE_4__["HandyTextInputComponent"],
                    _components_handy_password_input_handy_password_input_component__WEBPACK_IMPORTED_MODULE_5__["HandyPasswordInputComponent"],
                    _components_handy_number_input_handy_number_input_component__WEBPACK_IMPORTED_MODULE_6__["HandyNumberInputComponent"],
                    _components_handy_textarea_input_handy_textarea_input_component__WEBPACK_IMPORTED_MODULE_7__["HandyTextAreaInputComponent"],
                    _components_handy_select_input_handy_select_input_component__WEBPACK_IMPORTED_MODULE_8__["HandySelectInputComponent"],
                    _components_handy_multi_select_input_handy_multi_select_input_component__WEBPACK_IMPORTED_MODULE_9__["HandyMultiSelectInputComponent"],
                    _components_handy_radio_group_input_handy_radio_group_input_component__WEBPACK_IMPORTED_MODULE_10__["HandyRadioGroupInputComponent"],
                    _components_handy_check_box_input_handy_check_box_input_component__WEBPACK_IMPORTED_MODULE_11__["HandyCheckBoxInputComponent"],
                    _components_handy_slide_toggle_input_handy_slide_toggle_input_component__WEBPACK_IMPORTED_MODULE_12__["HandySlideToggleInputComponent"],
                    _components_handy_slider_input_handy_slider_input_component__WEBPACK_IMPORTED_MODULE_13__["HandySliderInputComponent"],
                    _components_handy_date_input_handy_date_input_component__WEBPACK_IMPORTED_MODULE_14__["HandyDateInputComponent"],
                    _components_handy_date_input_input_calendar_input_calendar_component__WEBPACK_IMPORTED_MODULE_15__["InputCalendarComponent"],
                    _components_handy_time_input_handy_time_input_component__WEBPACK_IMPORTED_MODULE_16__["HandyTimeInputComponent"],
                    _components_handy_date_range_input_handy_date_range_input_component__WEBPACK_IMPORTED_MODULE_17__["HandyDateRangeInputComponent"],
                    _components_handy_rte_input_handy_rte_input_component__WEBPACK_IMPORTED_MODULE_19__["HandyRteInputComponent"],
                    _components_password_hint_password_hint_component__WEBPACK_IMPORTED_MODULE_22__["PasswordHintComponent"],
                    _directives_file_upload_directive__WEBPACK_IMPORTED_MODULE_23__["FileUploadDirective"],
                    _directives_upload_drag_directive__WEBPACK_IMPORTED_MODULE_24__["UploadDragDirective"],
                    _components_handy_file_input_handy_file_input_component__WEBPACK_IMPORTED_MODULE_25__["HandyFileInputComponent"],
                    _components_handy_irl_county_select_input_handy_irl_county_select_input__WEBPACK_IMPORTED_MODULE_26__["HandyIrlCountySelectInputComponent"],
                    _components_form_caption_form_caption_component__WEBPACK_IMPORTED_MODULE_27__["FormCaptionComponent"],
                    _components_form_divider_form_divider_component__WEBPACK_IMPORTED_MODULE_28__["FormDividerComponent"],
                    _components_form_caption_divider_form_caption_divider_component__WEBPACK_IMPORTED_MODULE_29__["FormCaptionDividerComponent"],
                    _components_handy_custom_file_input_handy_custom_file_input_component__WEBPACK_IMPORTED_MODULE_30__["HandyCustomFileInputComponent"],
                    _components_handy_chip_input_handy_chip_input_component__WEBPACK_IMPORTED_MODULE_31__["HandyChipInputComponent"]
                ],
                imports: [
                    _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
                    src_app_modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_20__["SharedModule"],
                    ngx_quill__WEBPACK_IMPORTED_MODULE_18__["QuillModule"].forRoot()
                ],
                exports: [
                    _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
                    _components_handy_form_handy_form_component__WEBPACK_IMPORTED_MODULE_2__["HandyFormComponent"],
                    _components_handy_text_input_handy_text_input_component__WEBPACK_IMPORTED_MODULE_4__["HandyTextInputComponent"],
                    _components_handy_password_input_handy_password_input_component__WEBPACK_IMPORTED_MODULE_5__["HandyPasswordInputComponent"],
                    _components_handy_number_input_handy_number_input_component__WEBPACK_IMPORTED_MODULE_6__["HandyNumberInputComponent"],
                    _components_handy_textarea_input_handy_textarea_input_component__WEBPACK_IMPORTED_MODULE_7__["HandyTextAreaInputComponent"],
                    _components_handy_select_input_handy_select_input_component__WEBPACK_IMPORTED_MODULE_8__["HandySelectInputComponent"],
                    _components_handy_multi_select_input_handy_multi_select_input_component__WEBPACK_IMPORTED_MODULE_9__["HandyMultiSelectInputComponent"],
                    _components_handy_radio_group_input_handy_radio_group_input_component__WEBPACK_IMPORTED_MODULE_10__["HandyRadioGroupInputComponent"],
                    _components_handy_check_box_input_handy_check_box_input_component__WEBPACK_IMPORTED_MODULE_11__["HandyCheckBoxInputComponent"],
                    _components_handy_slide_toggle_input_handy_slide_toggle_input_component__WEBPACK_IMPORTED_MODULE_12__["HandySlideToggleInputComponent"],
                    _components_handy_slider_input_handy_slider_input_component__WEBPACK_IMPORTED_MODULE_13__["HandySliderInputComponent"],
                    _components_handy_date_input_handy_date_input_component__WEBPACK_IMPORTED_MODULE_14__["HandyDateInputComponent"],
                    _components_handy_time_input_handy_time_input_component__WEBPACK_IMPORTED_MODULE_16__["HandyTimeInputComponent"],
                    _components_handy_date_range_input_handy_date_range_input_component__WEBPACK_IMPORTED_MODULE_17__["HandyDateRangeInputComponent"],
                    _components_handy_rte_input_handy_rte_input_component__WEBPACK_IMPORTED_MODULE_19__["HandyRteInputComponent"],
                    _components_password_hint_password_hint_component__WEBPACK_IMPORTED_MODULE_22__["PasswordHintComponent"],
                    _directives_file_upload_directive__WEBPACK_IMPORTED_MODULE_23__["FileUploadDirective"],
                    _directives_upload_drag_directive__WEBPACK_IMPORTED_MODULE_24__["UploadDragDirective"],
                    _components_handy_file_input_handy_file_input_component__WEBPACK_IMPORTED_MODULE_25__["HandyFileInputComponent"],
                    _components_handy_irl_county_select_input_handy_irl_county_select_input__WEBPACK_IMPORTED_MODULE_26__["HandyIrlCountySelectInputComponent"],
                    _components_form_caption_form_caption_component__WEBPACK_IMPORTED_MODULE_27__["FormCaptionComponent"],
                    _components_form_divider_form_divider_component__WEBPACK_IMPORTED_MODULE_28__["FormDividerComponent"],
                    _components_form_caption_divider_form_caption_divider_component__WEBPACK_IMPORTED_MODULE_29__["FormCaptionDividerComponent"],
                    _components_handy_custom_file_input_handy_custom_file_input_component__WEBPACK_IMPORTED_MODULE_30__["HandyCustomFileInputComponent"],
                    _components_handy_chip_input_handy_chip_input_component__WEBPACK_IMPORTED_MODULE_31__["HandyChipInputComponent"]
                ],
                providers: [
                    _validators__WEBPACK_IMPORTED_MODULE_21__["PasswordValidator"]
                ],
                entryComponents: [
                    _components_handy_date_input_input_calendar_input_calendar_component__WEBPACK_IMPORTED_MODULE_15__["InputCalendarComponent"]
                ],
            }]
    }], null, null); })();
_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetComponentScope"](_components_handy_file_input_handy_file_input_component__WEBPACK_IMPORTED_MODULE_25__["HandyFileInputComponent"], [_angular_common__WEBPACK_IMPORTED_MODULE_1__["NgClass"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["NgComponentOutlet"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["NgForOf"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["NgIf"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["NgTemplateOutlet"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["NgStyle"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["NgSwitch"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["NgSwitchCase"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["NgSwitchDefault"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["NgPlural"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["NgPluralCase"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ɵangular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NgSelectOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ɵangular_packages_forms_forms_x"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NumberValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["RangeValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["CheckboxControlValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["SelectControlValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["SelectMultipleControlValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["RadioControlValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["RequiredValidator"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["MinLengthValidator"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["MaxLengthValidator"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["PatternValidator"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["CheckboxRequiredValidator"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["EmailValidator"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NgModel"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NgModelGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NgForm"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControlDirective"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormGroupDirective"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControlName"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormGroupName"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormArrayName"], _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_32__["MatToolbar"], _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_32__["MatToolbarRow"], _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_33__["Dir"], _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_34__["CdkScrollable"], _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_35__["MatDrawer"], _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_35__["MatDrawerContainer"], _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_35__["MatDrawerContent"], _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_35__["MatSidenav"], _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_35__["MatSidenavContainer"], _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_35__["MatSidenavContent"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_36__["MatIcon"], _angular_material_core__WEBPACK_IMPORTED_MODULE_37__["MatRipple"], _angular_material_button__WEBPACK_IMPORTED_MODULE_38__["MatButton"], _angular_material_button__WEBPACK_IMPORTED_MODULE_38__["MatAnchor"], _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_39__["MatTooltip"], _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_39__["TooltipComponent"], _angular_material_list__WEBPACK_IMPORTED_MODULE_40__["MatList"], _angular_material_list__WEBPACK_IMPORTED_MODULE_40__["MatNavList"], _angular_material_list__WEBPACK_IMPORTED_MODULE_40__["MatListItem"], _angular_material_list__WEBPACK_IMPORTED_MODULE_40__["MatListAvatarCssMatStyler"], _angular_material_core__WEBPACK_IMPORTED_MODULE_37__["MatLine"], _angular_material_list__WEBPACK_IMPORTED_MODULE_40__["MatListIconCssMatStyler"], _angular_material_list__WEBPACK_IMPORTED_MODULE_40__["MatListSubheaderCssMatStyler"], _angular_material_core__WEBPACK_IMPORTED_MODULE_37__["MatPseudoCheckbox"], _angular_material_list__WEBPACK_IMPORTED_MODULE_40__["MatSelectionList"], _angular_material_list__WEBPACK_IMPORTED_MODULE_40__["MatListOption"], _angular_material_divider__WEBPACK_IMPORTED_MODULE_41__["MatDivider"], _angular_material_menu__WEBPACK_IMPORTED_MODULE_42__["_MatMenu"], _angular_material_menu__WEBPACK_IMPORTED_MODULE_42__["MatMenuItem"], _angular_material_menu__WEBPACK_IMPORTED_MODULE_42__["MatMenuTrigger"], _angular_material_menu__WEBPACK_IMPORTED_MODULE_42__["MatMenuContent"], _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_43__["MatSlideToggleRequiredValidator"], _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_43__["MatSlideToggle"], _angular_material_badge__WEBPACK_IMPORTED_MODULE_44__["MatBadge"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_45__["MatError"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_45__["MatFormField"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_45__["MatHint"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_45__["MatLabel"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_45__["MatPlaceholder"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_45__["MatPrefix"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_45__["MatSuffix"], _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_46__["CdkAutofill"], _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_46__["CdkTextareaAutosize"], _angular_material_input__WEBPACK_IMPORTED_MODULE_47__["MatInput"], _angular_material_input__WEBPACK_IMPORTED_MODULE_47__["MatTextareaAutosize"], _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_48__["MatProgressSpinner"], _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_48__["MatSpinner"], _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_49__["MatAutocomplete"], _angular_material_core__WEBPACK_IMPORTED_MODULE_37__["MatOption"], _angular_material_core__WEBPACK_IMPORTED_MODULE_37__["MatOptgroup"], _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_49__["MatAutocompleteTrigger"], _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_49__["MatAutocompleteOrigin"], _angular_material_select__WEBPACK_IMPORTED_MODULE_50__["MatSelect"], _angular_material_select__WEBPACK_IMPORTED_MODULE_50__["MatSelectTrigger"], _angular_material_radio__WEBPACK_IMPORTED_MODULE_51__["MatRadioGroup"], _angular_material_radio__WEBPACK_IMPORTED_MODULE_51__["MatRadioButton"], _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_52__["MatCheckbox"], _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_52__["MatCheckboxRequiredValidator"], _angular_material_slider__WEBPACK_IMPORTED_MODULE_53__["MatSlider"], _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_54__["MatCalendar"], _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_54__["MatCalendarBody"], _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_54__["MatDatepicker"], _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_54__["MatDatepickerContent"], _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_54__["MatDatepickerInput"], _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_54__["MatDatepickerToggle"], _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_54__["MatDatepickerToggleIcon"], _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_54__["MatMonthView"], _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_54__["MatYearView"], _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_54__["MatMultiYearView"], _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_54__["MatCalendarHeader"], _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_54__["MatDateRangeInput"], _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_54__["MatStartDate"], _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_54__["MatEndDate"], _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_54__["MatDateRangePicker"], _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_55__["CdkConnectedOverlay"], _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_55__["CdkOverlayOrigin"], _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_34__["CdkFixedSizeVirtualScroll"], _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_34__["CdkVirtualForOf"], _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_34__["CdkVirtualScrollViewport"], _angular_material_card__WEBPACK_IMPORTED_MODULE_56__["MatCard"], _angular_material_card__WEBPACK_IMPORTED_MODULE_56__["MatCardHeader"], _angular_material_card__WEBPACK_IMPORTED_MODULE_56__["MatCardTitleGroup"], _angular_material_card__WEBPACK_IMPORTED_MODULE_56__["MatCardContent"], _angular_material_card__WEBPACK_IMPORTED_MODULE_56__["MatCardTitle"], _angular_material_card__WEBPACK_IMPORTED_MODULE_56__["MatCardSubtitle"], _angular_material_card__WEBPACK_IMPORTED_MODULE_56__["MatCardActions"], _angular_material_card__WEBPACK_IMPORTED_MODULE_56__["MatCardFooter"], _angular_material_card__WEBPACK_IMPORTED_MODULE_56__["MatCardSmImage"], _angular_material_card__WEBPACK_IMPORTED_MODULE_56__["MatCardMdImage"], _angular_material_card__WEBPACK_IMPORTED_MODULE_56__["MatCardLgImage"], _angular_material_card__WEBPACK_IMPORTED_MODULE_56__["MatCardImage"], _angular_material_card__WEBPACK_IMPORTED_MODULE_56__["MatCardXlImage"], _angular_material_card__WEBPACK_IMPORTED_MODULE_56__["MatCardAvatar"], _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_57__["MatGridList"], _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_57__["MatGridTile"], _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_57__["MatGridTileText"], _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_57__["MatGridTileHeaderCssMatStyler"], _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_57__["MatGridTileFooterCssMatStyler"], _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_57__["MatGridAvatarCssMatStyler"], _angular_material_table__WEBPACK_IMPORTED_MODULE_58__["MatTable"], _angular_material_table__WEBPACK_IMPORTED_MODULE_58__["MatHeaderCellDef"], _angular_material_table__WEBPACK_IMPORTED_MODULE_58__["MatHeaderRowDef"], _angular_material_table__WEBPACK_IMPORTED_MODULE_58__["MatColumnDef"], _angular_material_table__WEBPACK_IMPORTED_MODULE_58__["MatCellDef"], _angular_material_table__WEBPACK_IMPORTED_MODULE_58__["MatRowDef"], _angular_material_table__WEBPACK_IMPORTED_MODULE_58__["MatFooterCellDef"], _angular_material_table__WEBPACK_IMPORTED_MODULE_58__["MatFooterRowDef"], _angular_material_table__WEBPACK_IMPORTED_MODULE_58__["MatHeaderCell"], _angular_material_table__WEBPACK_IMPORTED_MODULE_58__["MatCell"], _angular_material_table__WEBPACK_IMPORTED_MODULE_58__["MatFooterCell"], _angular_material_table__WEBPACK_IMPORTED_MODULE_58__["MatHeaderRow"], _angular_material_table__WEBPACK_IMPORTED_MODULE_58__["MatRow"], _angular_material_table__WEBPACK_IMPORTED_MODULE_58__["MatFooterRow"], _angular_material_table__WEBPACK_IMPORTED_MODULE_58__["MatNoDataRow"], _angular_material_table__WEBPACK_IMPORTED_MODULE_58__["MatTextColumn"], _angular_material_paginator__WEBPACK_IMPORTED_MODULE_59__["MatPaginator"], _angular_material_sort__WEBPACK_IMPORTED_MODULE_60__["MatSort"], _angular_material_sort__WEBPACK_IMPORTED_MODULE_60__["MatSortHeader"], _angular_material_expansion__WEBPACK_IMPORTED_MODULE_61__["MatAccordion"], _angular_material_expansion__WEBPACK_IMPORTED_MODULE_61__["MatExpansionPanel"], _angular_material_expansion__WEBPACK_IMPORTED_MODULE_61__["MatExpansionPanelActionRow"], _angular_material_expansion__WEBPACK_IMPORTED_MODULE_61__["MatExpansionPanelHeader"], _angular_material_expansion__WEBPACK_IMPORTED_MODULE_61__["MatExpansionPanelTitle"], _angular_material_expansion__WEBPACK_IMPORTED_MODULE_61__["MatExpansionPanelDescription"], _angular_material_expansion__WEBPACK_IMPORTED_MODULE_61__["MatExpansionPanelContent"], _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_62__["CdkDropList"], _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_62__["CdkDropListGroup"], _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_62__["CdkDrag"], _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_62__["CdkDragHandle"], _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_62__["CdkDragPreview"], _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_62__["CdkDragPlaceholder"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_63__["MatDialogContainer"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_63__["MatDialogClose"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_63__["MatDialogTitle"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_63__["MatDialogContent"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_63__["MatDialogActions"], _angular_material_stepper__WEBPACK_IMPORTED_MODULE_64__["MatHorizontalStepper"], _angular_material_stepper__WEBPACK_IMPORTED_MODULE_64__["MatVerticalStepper"], _angular_material_stepper__WEBPACK_IMPORTED_MODULE_64__["MatStep"], _angular_material_stepper__WEBPACK_IMPORTED_MODULE_64__["MatStepLabel"], _angular_material_stepper__WEBPACK_IMPORTED_MODULE_64__["MatStepper"], _angular_material_stepper__WEBPACK_IMPORTED_MODULE_64__["MatStepperNext"], _angular_material_stepper__WEBPACK_IMPORTED_MODULE_64__["MatStepperPrevious"], _angular_material_stepper__WEBPACK_IMPORTED_MODULE_64__["MatStepHeader"], _angular_material_stepper__WEBPACK_IMPORTED_MODULE_64__["MatStepperIcon"], _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_65__["MatSnackBarContainer"], _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_66__["MatProgressBar"], _angular_material_chips__WEBPACK_IMPORTED_MODULE_67__["MatChipList"], _angular_material_chips__WEBPACK_IMPORTED_MODULE_67__["MatChip"], _angular_material_chips__WEBPACK_IMPORTED_MODULE_67__["MatChipInput"], _angular_material_chips__WEBPACK_IMPORTED_MODULE_67__["MatChipRemove"], _angular_material_chips__WEBPACK_IMPORTED_MODULE_67__["MatChipAvatar"], _angular_material_chips__WEBPACK_IMPORTED_MODULE_67__["MatChipTrailingIcon"], _handy_ng_directives_dev_env_directive__WEBPACK_IMPORTED_MODULE_68__["DevEnvDirective"], _handy_ng_directives_stag_env_directive__WEBPACK_IMPORTED_MODULE_69__["StagEnvDirective"], _handy_ng_directives_prod_env_directive__WEBPACK_IMPORTED_MODULE_70__["ProdEnvDirective"], _handy_ng_directives_is_browser_directive__WEBPACK_IMPORTED_MODULE_71__["IsBrowserDirective"], _handy_ng_directives_is_server_directive__WEBPACK_IMPORTED_MODULE_72__["IsServerDirective"], _handy_ng_directives_is_android_directive__WEBPACK_IMPORTED_MODULE_73__["IsAndroidDirective"], _handy_ng_directives_is_ios_directive__WEBPACK_IMPORTED_MODULE_74__["IsIosDirective"], _handy_ng_directives_xs_layout_directive__WEBPACK_IMPORTED_MODULE_75__["XsLayoutDirective"], _handy_ng_directives_sm_layout_directive__WEBPACK_IMPORTED_MODULE_76__["SmLayoutDirective"], _handy_ng_directives_md_layout_directive__WEBPACK_IMPORTED_MODULE_77__["MdLayoutDirective"], _handy_ng_directives_lg_layout_directive__WEBPACK_IMPORTED_MODULE_78__["LgLayoutDirective"], _handy_ng_directives_xl_layout_directive__WEBPACK_IMPORTED_MODULE_79__["XlLayoutDirective"], _handy_ng_directives_is_mobile_directive__WEBPACK_IMPORTED_MODULE_80__["IsMobileDirective"], _handy_ng_directives_is_desktop_directive__WEBPACK_IMPORTED_MODULE_81__["IsDesktopDirective"], _handy_ng_directives_enviroments_only_directive__WEBPACK_IMPORTED_MODULE_82__["EnviromentsOnlyDirective"], _handy_ng_directives_breakpoints_only_directive__WEBPACK_IMPORTED_MODULE_83__["BreakpointsOnlyDirective"], _handy_ng_directives_logged_in_only_directive__WEBPACK_IMPORTED_MODULE_84__["LoggedInOnlyDirective"], _handy_ng_directives_roles_only_directive__WEBPACK_IMPORTED_MODULE_85__["RolesOnlyDirective"], _handy_ng_directives_permissions_only_directive__WEBPACK_IMPORTED_MODULE_86__["PermissionsOnlyDirective"], _handy_ng_directives_groups_only_directive__WEBPACK_IMPORTED_MODULE_87__["GroupsOnlyDirective"], _handy_ng_directives_not_logged_in_only_directive__WEBPACK_IMPORTED_MODULE_88__["NotLoggedInOnlyDirective"], _modules_shared_components_handy_icon_handy_icon_component__WEBPACK_IMPORTED_MODULE_89__["HandyIconComponent"], _modules_shared_components_handy_nav_layout_components_sidenav_navigation_item_sidenav_navigation_item_component__WEBPACK_IMPORTED_MODULE_90__["SidenavNavigationItemComponent"], _modules_shared_components_handy_nav_layout_handy_nav_layout_component__WEBPACK_IMPORTED_MODULE_91__["HandyNavLayoutComponent"], _handy_ng_directives_confirm_click_directive__WEBPACK_IMPORTED_MODULE_92__["ConfirmClickDirective"], _modules_shared_components_global_loader_global_loader_component__WEBPACK_IMPORTED_MODULE_93__["GlobalLoaderComponent"], _modules_shared_components_buttons_basic_btn_basic_btn_component__WEBPACK_IMPORTED_MODULE_94__["BasicBtnComponent"], _modules_shared_components_buttons_raised_btn_raised_btn_component__WEBPACK_IMPORTED_MODULE_95__["RaisedBtnComponent"], _modules_shared_components_buttons_stroked_btn_stroked_btn_component__WEBPACK_IMPORTED_MODULE_96__["StrokedBtnComponent"], _modules_shared_components_buttons_flat_btn_flat_btn_component__WEBPACK_IMPORTED_MODULE_97__["FlatBtnComponent"], _modules_shared_components_buttons_icon_btn_icon_btn_component__WEBPACK_IMPORTED_MODULE_98__["IconBtnComponent"], _modules_shared_components_buttons_fab_btn_fab_btn_component__WEBPACK_IMPORTED_MODULE_99__["FabBtnComponent"], _modules_shared_components_buttons_mini_fab_btn_mini_fab_btn_component__WEBPACK_IMPORTED_MODULE_100__["MiniFabBtnComponent"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_101__["DefaultLayoutDirective"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_101__["DefaultLayoutGapDirective"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_101__["DefaultLayoutAlignDirective"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_101__["DefaultFlexOrderDirective"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_101__["DefaultFlexOffsetDirective"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_101__["FlexFillDirective"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_101__["DefaultFlexAlignDirective"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_101__["DefaultFlexDirective"], _angular_flex_layout_extended__WEBPACK_IMPORTED_MODULE_102__["DefaultShowHideDirective"], _angular_flex_layout_extended__WEBPACK_IMPORTED_MODULE_102__["DefaultClassDirective"], _angular_flex_layout_extended__WEBPACK_IMPORTED_MODULE_102__["DefaultStyleDirective"], _angular_flex_layout_extended__WEBPACK_IMPORTED_MODULE_102__["DefaultImgSrcDirective"], _angular_flex_layout_grid__WEBPACK_IMPORTED_MODULE_103__["ɵgrid_privatec"], _angular_flex_layout_grid__WEBPACK_IMPORTED_MODULE_103__["ɵgrid_privatef"], _angular_flex_layout_grid__WEBPACK_IMPORTED_MODULE_103__["ɵgrid_privatei"], _angular_flex_layout_grid__WEBPACK_IMPORTED_MODULE_103__["ɵgrid_privatel"], _angular_flex_layout_grid__WEBPACK_IMPORTED_MODULE_103__["ɵgrid_privateo"], _angular_flex_layout_grid__WEBPACK_IMPORTED_MODULE_103__["ɵgrid_privater"], _angular_flex_layout_grid__WEBPACK_IMPORTED_MODULE_103__["ɵgrid_privateu"], _angular_flex_layout_grid__WEBPACK_IMPORTED_MODULE_103__["ɵgrid_privatex"], _angular_flex_layout_grid__WEBPACK_IMPORTED_MODULE_103__["ɵgrid_privateba"], _angular_flex_layout_grid__WEBPACK_IMPORTED_MODULE_103__["ɵgrid_privatebd"], _angular_flex_layout_grid__WEBPACK_IMPORTED_MODULE_103__["ɵgrid_privatebg"], _modules_shared_components_form_actions_bar_form_actions_bar_component__WEBPACK_IMPORTED_MODULE_104__["FormActionsBarComponent"], _modules_shared_components_file_thumb_file_thumb_component__WEBPACK_IMPORTED_MODULE_105__["FileThumbComponent"], _modules_shared_components_handy_expander_handy_expander_component__WEBPACK_IMPORTED_MODULE_106__["HandyExpanderComponent"], _handy_ng_directives_copy_to_clipboard_click__WEBPACK_IMPORTED_MODULE_107__["CopyToClipboardClickDirective"], _directives_templ_var_directive__WEBPACK_IMPORTED_MODULE_108__["TemplateVariableDirective"], _handy_ng_directives_handy_if_on_screen_directive__WEBPACK_IMPORTED_MODULE_109__["HandyIfOnScreenDirective"], _handy_ng_directives_handy_delay_render_directive__WEBPACK_IMPORTED_MODULE_110__["HandyRenderDelayDirective"], ngx_quill__WEBPACK_IMPORTED_MODULE_18__["QuillEditorComponent"], ngx_quill__WEBPACK_IMPORTED_MODULE_18__["QuillViewComponent"], ngx_quill__WEBPACK_IMPORTED_MODULE_18__["QuillViewHTMLComponent"], _components_handy_form_handy_form_component__WEBPACK_IMPORTED_MODULE_2__["HandyFormComponent"],
    _components_handy_text_input_handy_text_input_component__WEBPACK_IMPORTED_MODULE_4__["HandyTextInputComponent"],
    _components_handy_password_input_handy_password_input_component__WEBPACK_IMPORTED_MODULE_5__["HandyPasswordInputComponent"],
    _components_handy_number_input_handy_number_input_component__WEBPACK_IMPORTED_MODULE_6__["HandyNumberInputComponent"],
    _components_handy_textarea_input_handy_textarea_input_component__WEBPACK_IMPORTED_MODULE_7__["HandyTextAreaInputComponent"],
    _components_handy_select_input_handy_select_input_component__WEBPACK_IMPORTED_MODULE_8__["HandySelectInputComponent"],
    _components_handy_multi_select_input_handy_multi_select_input_component__WEBPACK_IMPORTED_MODULE_9__["HandyMultiSelectInputComponent"],
    _components_handy_radio_group_input_handy_radio_group_input_component__WEBPACK_IMPORTED_MODULE_10__["HandyRadioGroupInputComponent"],
    _components_handy_check_box_input_handy_check_box_input_component__WEBPACK_IMPORTED_MODULE_11__["HandyCheckBoxInputComponent"],
    _components_handy_slide_toggle_input_handy_slide_toggle_input_component__WEBPACK_IMPORTED_MODULE_12__["HandySlideToggleInputComponent"],
    _components_handy_slider_input_handy_slider_input_component__WEBPACK_IMPORTED_MODULE_13__["HandySliderInputComponent"],
    _components_handy_date_input_handy_date_input_component__WEBPACK_IMPORTED_MODULE_14__["HandyDateInputComponent"],
    _components_handy_date_input_input_calendar_input_calendar_component__WEBPACK_IMPORTED_MODULE_15__["InputCalendarComponent"],
    _components_handy_time_input_handy_time_input_component__WEBPACK_IMPORTED_MODULE_16__["HandyTimeInputComponent"],
    _components_handy_date_range_input_handy_date_range_input_component__WEBPACK_IMPORTED_MODULE_17__["HandyDateRangeInputComponent"],
    _components_handy_rte_input_handy_rte_input_component__WEBPACK_IMPORTED_MODULE_19__["HandyRteInputComponent"],
    _components_password_hint_password_hint_component__WEBPACK_IMPORTED_MODULE_22__["PasswordHintComponent"],
    _directives_file_upload_directive__WEBPACK_IMPORTED_MODULE_23__["FileUploadDirective"],
    _directives_upload_drag_directive__WEBPACK_IMPORTED_MODULE_24__["UploadDragDirective"],
    _components_handy_file_input_handy_file_input_component__WEBPACK_IMPORTED_MODULE_25__["HandyFileInputComponent"],
    _components_handy_irl_county_select_input_handy_irl_county_select_input__WEBPACK_IMPORTED_MODULE_26__["HandyIrlCountySelectInputComponent"],
    _components_form_caption_form_caption_component__WEBPACK_IMPORTED_MODULE_27__["FormCaptionComponent"],
    _components_form_divider_form_divider_component__WEBPACK_IMPORTED_MODULE_28__["FormDividerComponent"],
    _components_form_caption_divider_form_caption_divider_component__WEBPACK_IMPORTED_MODULE_29__["FormCaptionDividerComponent"],
    _components_handy_custom_file_input_handy_custom_file_input_component__WEBPACK_IMPORTED_MODULE_30__["HandyCustomFileInputComponent"],
    _components_handy_chip_input_handy_chip_input_component__WEBPACK_IMPORTED_MODULE_31__["HandyChipInputComponent"]], [_angular_common__WEBPACK_IMPORTED_MODULE_1__["AsyncPipe"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["UpperCasePipe"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["LowerCasePipe"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["JsonPipe"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["SlicePipe"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["DecimalPipe"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["PercentPipe"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["TitleCasePipe"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["CurrencyPipe"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["DatePipe"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["I18nPluralPipe"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["I18nSelectPipe"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["KeyValuePipe"], _handy_ng_pipes_truncate_pipe__WEBPACK_IMPORTED_MODULE_111__["TruncatePipe"], _handy_ng_pipes_handy_date_pipe__WEBPACK_IMPORTED_MODULE_112__["HandyDatePipe"], _handy_ng_pipes_handy_timezone_pipe__WEBPACK_IMPORTED_MODULE_113__["HandyTimeZonePipe"], _handy_ng_pipes_handy_time_pipe__WEBPACK_IMPORTED_MODULE_114__["HandyTimePipe"], _handy_ng_pipes_keep_html_tags_pipe__WEBPACK_IMPORTED_MODULE_115__["KeepHtmlTagsPipe"], _handy_ng_pipes_handy_eur_pipe__WEBPACK_IMPORTED_MODULE_116__["HandyEurPipe"]]);


/***/ }),

/***/ "./src/app/handy/modules/handy-form/validators/eir-code.validator.ts":
/*!***************************************************************************!*\
  !*** ./src/app/handy/modules/handy-form/validators/eir-code.validator.ts ***!
  \***************************************************************************/
/*! exports provided: IrlZipRegex, eirCode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IrlZipRegex", function() { return IrlZipRegex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "eirCode", function() { return eirCode; });
/* harmony import */ var _handy_ng_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @handy-ng/core */ "./src/app/handy/core/index.ts");

const IrlZipRegex = new RegExp(/(?:^[AC-FHKNPRTV-Y][0-9]{2}|D6W)[ -]?[0-9AC-FHKNPRTV-Y]{4}$/);
class IrlZipCodeValidator extends _handy_ng_core__WEBPACK_IMPORTED_MODULE_0__["HandyNgSyncValidator"] {
    // Return true if value is invalid
    static isInValidIf(value) {
        return !IrlZipRegex.test(value);
    }
    static validate(errMsg = 'Invalid EIR Code') {
        return (control) => {
            let { value } = control;
            if (IrlZipCodeValidator.emptyValueIsValid && IrlZipCodeValidator.isEmpty(value)) {
                return null;
            }
            if (typeof value === 'string') {
                let hasLC = (/[a-z]/.test(value));
                let changeBecauseOfSpace = false;
                if (hasLC) {
                    value = value.toUpperCase();
                }
                value = value.replace(/O/, '0');
                if (value.length > 3 && value[3] !== ' ') {
                    let rest = value.slice(3).replace(/\s/g, '');
                    value = value.slice(0, 3) + ' ' + rest;
                    changeBecauseOfSpace = true;
                }
                if (hasLC || changeBecauseOfSpace) {
                    let originalCaretPos = control['caretPos'];
                    control.setValue(value, { emitEvent: true, emitModelToViewChange: true, emitViewToModelChange: true });
                    if (typeof originalCaretPos !== 'number') {
                        return;
                    }
                    let spacingCase = false;
                    let valLen = value.length;
                    if (valLen > 1 && value[originalCaretPos - 1] === ' ') {
                        spacingCase = true;
                    }
                    let newCaretPos = spacingCase ? originalCaretPos + 1 : originalCaretPos + 0;
                    if (valLen > newCaretPos) {
                        control['moveCaretTo'](newCaretPos);
                    }
                }
            }
            let invalid = IrlZipCodeValidator.isInValidIf(value);
            if (invalid) {
                return IrlZipCodeValidator.returnError(errMsg);
            }
            // ! has to return null if field is valid
            return null;
        };
    }
}
const eirCode = IrlZipCodeValidator.validate;
// import email from '@ng-shared/form-validators';


/***/ }),

/***/ "./src/app/handy/modules/handy-form/validators/email.validator.ts":
/*!************************************************************************!*\
  !*** ./src/app/handy/modules/handy-form/validators/email.validator.ts ***!
  \************************************************************************/
/*! exports provided: EmailRegex, email */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmailRegex", function() { return EmailRegex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "email", function() { return email; });
/* harmony import */ var _handy_ng_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @handy-ng/core */ "./src/app/handy/core/index.ts");

const EmailRegex = new RegExp(/^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/);
class EmailValidator extends _handy_ng_core__WEBPACK_IMPORTED_MODULE_0__["HandyNgSyncValidator"] {
    // Return true if value is invalid
    static isInValidIf(value) {
        return !EmailRegex.test(value);
    }
    static validate(errMsg = 'Invalid email') {
        return (control) => {
            let { value } = control;
            if (EmailValidator.emptyValueIsValid && EmailValidator.isEmpty(value)) {
                return null;
            }
            if (typeof value === 'string') {
                let hasCapital = (/[A-Z]/.test(value));
                let hasEmptySPace = (/\s/g.test(value));
                if (hasCapital) {
                    value = value.toLowerCase();
                }
                if (hasEmptySPace) {
                    value = value.replace(/\s/g, '');
                }
                if (hasCapital || hasEmptySPace) {
                    control.setValue(value, { emitEvent: true, emitModelToViewChange: true, emitViewToModelChange: true });
                }
            }
            let invalid = EmailValidator.isInValidIf(value);
            if (invalid) {
                return EmailValidator.returnError(errMsg);
            }
            // ! has to return null if field is valid
            return null;
        };
    }
}
const email = EmailValidator.validate;
// import email from '@ng-shared/form-validators';


/***/ }),

/***/ "./src/app/handy/modules/handy-form/validators/index.ts":
/*!**************************************************************!*\
  !*** ./src/app/handy/modules/handy-form/validators/index.ts ***!
  \**************************************************************/
/*! exports provided: required, EmailRegex, email, PasswordValidator, password, IrlZipRegex, eirCode, irlPhoneNr, maxLength */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _required_form_validator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./required.form-validator */ "./src/app/handy/modules/handy-form/validators/required.form-validator.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "required", function() { return _required_form_validator__WEBPACK_IMPORTED_MODULE_0__["required"]; });

/* harmony import */ var _email_validator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./email.validator */ "./src/app/handy/modules/handy-form/validators/email.validator.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EmailRegex", function() { return _email_validator__WEBPACK_IMPORTED_MODULE_1__["EmailRegex"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "email", function() { return _email_validator__WEBPACK_IMPORTED_MODULE_1__["email"]; });

/* harmony import */ var _password_validator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./password.validator */ "./src/app/handy/modules/handy-form/validators/password.validator.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PasswordValidator", function() { return _password_validator__WEBPACK_IMPORTED_MODULE_2__["PasswordValidator"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "password", function() { return _password_validator__WEBPACK_IMPORTED_MODULE_2__["password"]; });

/* harmony import */ var _eir_code_validator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./eir-code.validator */ "./src/app/handy/modules/handy-form/validators/eir-code.validator.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "IrlZipRegex", function() { return _eir_code_validator__WEBPACK_IMPORTED_MODULE_3__["IrlZipRegex"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "eirCode", function() { return _eir_code_validator__WEBPACK_IMPORTED_MODULE_3__["eirCode"]; });

/* harmony import */ var _irl_phone_nr_validator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./irl-phone-nr.validator */ "./src/app/handy/modules/handy-form/validators/irl-phone-nr.validator.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "irlPhoneNr", function() { return _irl_phone_nr_validator__WEBPACK_IMPORTED_MODULE_4__["irlPhoneNr"]; });

/* harmony import */ var _max_len_validator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./max-len.validator */ "./src/app/handy/modules/handy-form/validators/max-len.validator.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "maxLength", function() { return _max_len_validator__WEBPACK_IMPORTED_MODULE_5__["maxLength"]; });









/***/ }),

/***/ "./src/app/handy/modules/handy-form/validators/irl-phone-nr.validator.ts":
/*!*******************************************************************************!*\
  !*** ./src/app/handy/modules/handy-form/validators/irl-phone-nr.validator.ts ***!
  \*******************************************************************************/
/*! exports provided: irlPhoneNr */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "irlPhoneNr", function() { return irlPhoneNr; });
/* harmony import */ var _handy_ng_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @handy-ng/core */ "./src/app/handy/core/index.ts");

class IrlPhoneNrValidator extends _handy_ng_core__WEBPACK_IMPORTED_MODULE_0__["HandyNgSyncValidator"] {
    // Return true if value is invalid
    static isInValidIf(value, type) {
        let valid = false;
        let prefix = value.split(' ')[0];
        let isMobile = IrlPhoneNrValidator.mobilePrefixes.includes(prefix);
        let isLandline = IrlPhoneNrValidator.landlinePrefixes.includes(prefix);
        let digitsOnly = value.replace(/\s/g, '');
        if (!digitsOnly.match(/^\d+$/)) {
            return true;
        }
        switch (type) {
            case 'mobile':
                if (isMobile && value.length === 12) {
                    valid = true;
                }
                break;
            case 'landline':
                if (isLandline && IrlPhoneNrValidator.isValidLindline(value)) {
                    valid = true;
                }
                break;
            default:
                if (isMobile && value.length === 12) {
                    valid = true;
                }
                if (isLandline && IrlPhoneNrValidator.isValidLindline(value)) {
                    valid = true;
                }
                break;
        }
        return !valid;
    }
    static validate(errMsg = 'Invalid Phone nr.', type = 'both') {
        return (control) => {
            let { value } = control;
            if (IrlPhoneNrValidator.emptyValueIsValid && IrlPhoneNrValidator.isEmpty(value)) {
                return null;
            }
            if (typeof value === 'string' && value !== '0') {
                let changeValue = false;
                let originalValue = value;
                value = value.replace(/\s/g, '');
                if (value.startsWith('+353')) {
                    value = value.replace('+353', '0');
                    changeValue = true;
                }
                if (value.startsWith('00353')) {
                    value = value.replace('00353', '0');
                    changeValue = true;
                }
                let valLen = value.length;
                if (valLen > 1 && value[0] === '0') {
                    let isMobile = false;
                    let isLandline = false;
                    let startingDigit = value[1];
                    // ? mobile phone number formatting
                    if (startingDigit === '8') {
                        isMobile = true;
                    }
                    if (isMobile && valLen > 3) {
                        value = value.slice(0, 3) + ' ' + value.slice(3);
                    }
                    if (isMobile && valLen > 6) {
                        value = value.slice(0, 7) + ' ' + value.slice(7);
                    }
                    // ? landline phone number formatting
                    if (IrlPhoneNrValidator.landlinePrefixesFirstDigit.includes(startingDigit)) {
                        isLandline = true;
                    }
                    if (isLandline) {
                        for (let i = 0; i < IrlPhoneNrValidator.landlinesPrefixesLen; i++) {
                            const prefix = IrlPhoneNrValidator.landlinePrefixes[i];
                            if (value.startsWith(prefix)) {
                                let afterPrefixIndex = prefix.length;
                                if (valLen > afterPrefixIndex) {
                                    value = value.slice(0, afterPrefixIndex) + ' ' + value.slice(afterPrefixIndex);
                                }
                                let secondSpaceIndex = afterPrefixIndex + 4;
                                if (valLen >= secondSpaceIndex) {
                                    value = value.slice(0, secondSpaceIndex) + ' ' + value.slice(secondSpaceIndex);
                                }
                                break;
                            }
                        }
                    }
                    if (originalValue !== value) {
                        changeValue = true;
                    }
                }
                if (changeValue) {
                    let originalCaretPos = control['caretPos'];
                    setTimeout(() => {
                        control.setValue(value, { emitEvent: true, emitModelToViewChange: true, emitViewToModelChange: true });
                        if (typeof originalCaretPos !== 'number') {
                            return;
                        }
                        let spacingCase = false;
                        let valLen = value.length;
                        if (valLen > 1 && value[originalCaretPos - 1] === ' ') {
                            spacingCase = true;
                        }
                        let newCaretPos = spacingCase ? originalCaretPos + 1 : originalCaretPos + 0;
                        if (valLen > newCaretPos) {
                            control['moveCaretTo'](newCaretPos);
                        }
                    });
                }
            }
            let invalid = IrlPhoneNrValidator.isInValidIf(value, type);
            if (invalid) {
                return IrlPhoneNrValidator.returnError(errMsg);
            }
            // ! has to return null if field is valid
            return null;
        };
    }
    static isValidLindline(value) {
        let splitted = value.split(' ');
        let splittedLen = splitted.length;
        if (splittedLen === 3 && (splitted[2].length > 1 && splitted[2].length < 5)) {
            return true;
        }
        return false;
    }
}
IrlPhoneNrValidator.landlinePrefixesFirstDigit = ['1', '2', '4', '5', '6', '7', '9'];
IrlPhoneNrValidator.mobilePrefixes = ['083', '085', '086', '087', '089'];
IrlPhoneNrValidator.landlinePrefixes = [
    '01',
    '021', '022', '023', '024', '025', '026', '027', '028', '029',
    '0402', '0404', '041', '042', '043', '044', '045', '046', '047', '049',
    '0504', '0505', '051', '052', '053', '056', '057', '058', '059',
    '061', '062', '063', '064', '065', '066', '067', '068', '069',
    '071', '074',
    '090', '091', '093', '094', '095', '096', '097', '098', '099',
];
IrlPhoneNrValidator.landlinesPrefixesLen = IrlPhoneNrValidator.landlinePrefixes.length;
const irlPhoneNr = IrlPhoneNrValidator.validate;
// import email from '@ng-shared/form-validators';


/***/ }),

/***/ "./src/app/handy/modules/handy-form/validators/max-len.validator.ts":
/*!**************************************************************************!*\
  !*** ./src/app/handy/modules/handy-form/validators/max-len.validator.ts ***!
  \**************************************************************************/
/*! exports provided: maxLength */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "maxLength", function() { return maxLength; });
/* harmony import */ var _handy_ng_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @handy-ng/core */ "./src/app/handy/core/index.ts");

class MaxLenValidator extends _handy_ng_core__WEBPACK_IMPORTED_MODULE_0__["HandyNgSyncValidator"] {
    // Return true if value is invalid
    static isInValidIf(value, maxLen) {
        return typeof value !== 'string' ? false : value.length > maxLen;
    }
    static validate(maxLen, errMsg = 'Max. field length is ${maxLen} characters') {
        return (control) => {
            let { value } = control;
            if (MaxLenValidator.emptyValueIsValid && MaxLenValidator.isEmpty(value)) {
                return null;
            }
            let invalid = MaxLenValidator.isInValidIf(value, maxLen);
            if (invalid) {
                return MaxLenValidator.returnError(errMsg.replace('${maxLen}', maxLen.toString()));
            }
            // ! has to return null if field is valid
            return null;
        };
    }
}
const maxLength = MaxLenValidator.validate;


/***/ }),

/***/ "./src/app/handy/modules/handy-form/validators/password.validator.ts":
/*!***************************************************************************!*\
  !*** ./src/app/handy/modules/handy-form/validators/password.validator.ts ***!
  \***************************************************************************/
/*! exports provided: PasswordValidator, password */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PasswordValidator", function() { return PasswordValidator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "password", function() { return password; });
/* harmony import */ var _handy_ng_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @handy-ng/core */ "./src/app/handy/core/index.ts");

class PasswordValidator extends _handy_ng_core__WEBPACK_IMPORTED_MODULE_0__["HandyNgSyncValidator"] {
    // Return true if value is invalid
    static isInValidIf(value, handyNgUtilsService, minLen = 8, minPoints = 70) {
        if (typeof value === 'string' && value.length < minLen) {
            return true;
        }
        let result = handyNgUtilsService.getPasswordStrength(value);
        return (result.points < minPoints);
    }
    static validate(handyNgUtilsService, minLen = 8, minPoints = 70, errMsg = 'Password is too weak') {
        return (control) => {
            let { value } = control;
            if (PasswordValidator.emptyValueIsValid && PasswordValidator.isEmpty(value)) {
                return null;
            }
            let invalid = PasswordValidator.isInValidIf(value, handyNgUtilsService, minLen, minPoints);
            if (invalid) {
                return PasswordValidator.returnError(errMsg);
            }
            // ! has to return null if field is valid
            return null;
        };
    }
}
const password = PasswordValidator.validate;
// import password from '@ng-shared/form-validators';


/***/ }),

/***/ "./src/app/handy/modules/handy-form/validators/required.form-validator.ts":
/*!********************************************************************************!*\
  !*** ./src/app/handy/modules/handy-form/validators/required.form-validator.ts ***!
  \********************************************************************************/
/*! exports provided: required */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "required", function() { return required; });
/* harmony import */ var _handy_ng_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @handy-ng/core */ "./src/app/handy/core/index.ts");

class RequiredValidator extends _handy_ng_core__WEBPACK_IMPORTED_MODULE_0__["HandyNgSyncValidator"] {
    // Return true if value is invalid
    static isInValidIf(value) {
        return RequiredValidator.isEmpty(value);
    }
    static validate(errMsg = 'This field is invalid') {
        return (control) => {
            let { value } = control;
            if (RequiredValidator.emptyValueIsValid && RequiredValidator.isEmpty(value)) {
                return null;
            }
            let invalid = RequiredValidator.isInValidIf(value);
            if (invalid) {
                return RequiredValidator.returnError(errMsg);
            }
            // ! has to return null if field is valid
            return null;
        };
    }
}
RequiredValidator.emptyValueIsValid = false;
const required = RequiredValidator.validate;


/***/ }),

/***/ "./src/app/modules/shared/form-validators/future-date.validator.ts":
/*!*************************************************************************!*\
  !*** ./src/app/modules/shared/form-validators/future-date.validator.ts ***!
  \*************************************************************************/
/*! exports provided: futureDate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "futureDate", function() { return futureDate; });
/* harmony import */ var _handy_ng_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @handy-ng/core */ "./src/app/handy/core/index.ts");

class FutureDateValidator extends _handy_ng_core__WEBPACK_IMPORTED_MODULE_0__["HandyNgSyncValidator"] {
    // Return true if value is invalid
    static isInValidIf(value, secondsOffset = 0) {
        if (typeof value !== 'number') {
            return false;
        }
        let thisMoment = new Date().getTime() + (secondsOffset * 1000);
        return thisMoment > value;
    }
    static validate(errMsg = `This field can't be a passed date`, secondsOffset = 0) {
        return (control) => {
            let { value } = control;
            if (FutureDateValidator.emptyValueIsValid && FutureDateValidator.isEmpty(value)) {
                return null;
            }
            let invalid = FutureDateValidator.isInValidIf(value, secondsOffset);
            if (invalid) {
                return FutureDateValidator.returnError(errMsg);
            }
            // ! has to return null if field is valid
            return null;
        };
    }
}
const futureDate = FutureDateValidator.validate;
// import futureDate from '@ng-shared/form-validators';


/***/ }),

/***/ "./src/app/modules/shared/form-validators/index.ts":
/*!*********************************************************!*\
  !*** ./src/app/modules/shared/form-validators/index.ts ***!
  \*********************************************************/
/*! exports provided: required, EmailRegex, email, PasswordValidator, password, IrlZipRegex, eirCode, irlPhoneNr, maxLength, timeSlot, futureDate, maxFiles, linkValidator, requiredOneOf */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _handy_ng_modules_handy_form_validators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @handy-ng/modules/handy-form/validators */ "./src/app/handy/modules/handy-form/validators/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "required", function() { return _handy_ng_modules_handy_form_validators__WEBPACK_IMPORTED_MODULE_0__["required"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EmailRegex", function() { return _handy_ng_modules_handy_form_validators__WEBPACK_IMPORTED_MODULE_0__["EmailRegex"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "email", function() { return _handy_ng_modules_handy_form_validators__WEBPACK_IMPORTED_MODULE_0__["email"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PasswordValidator", function() { return _handy_ng_modules_handy_form_validators__WEBPACK_IMPORTED_MODULE_0__["PasswordValidator"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "password", function() { return _handy_ng_modules_handy_form_validators__WEBPACK_IMPORTED_MODULE_0__["password"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "IrlZipRegex", function() { return _handy_ng_modules_handy_form_validators__WEBPACK_IMPORTED_MODULE_0__["IrlZipRegex"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "eirCode", function() { return _handy_ng_modules_handy_form_validators__WEBPACK_IMPORTED_MODULE_0__["eirCode"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "irlPhoneNr", function() { return _handy_ng_modules_handy_form_validators__WEBPACK_IMPORTED_MODULE_0__["irlPhoneNr"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "maxLength", function() { return _handy_ng_modules_handy_form_validators__WEBPACK_IMPORTED_MODULE_0__["maxLength"]; });

/* harmony import */ var _time_slot_validator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./time-slot.validator */ "./src/app/modules/shared/form-validators/time-slot.validator.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "timeSlot", function() { return _time_slot_validator__WEBPACK_IMPORTED_MODULE_1__["timeSlot"]; });

/* harmony import */ var _future_date_validator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./future-date.validator */ "./src/app/modules/shared/form-validators/future-date.validator.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "futureDate", function() { return _future_date_validator__WEBPACK_IMPORTED_MODULE_2__["futureDate"]; });

/* harmony import */ var _max_files_validator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./max-files.validator */ "./src/app/modules/shared/form-validators/max-files.validator.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "maxFiles", function() { return _max_files_validator__WEBPACK_IMPORTED_MODULE_3__["maxFiles"]; });

/* harmony import */ var _link_validator_validator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./link-validator.validator */ "./src/app/modules/shared/form-validators/link-validator.validator.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "linkValidator", function() { return _link_validator_validator__WEBPACK_IMPORTED_MODULE_4__["linkValidator"]; });

/* harmony import */ var _required_one_of_validator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./required-one-of.validator */ "./src/app/modules/shared/form-validators/required-one-of.validator.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "requiredOneOf", function() { return _required_one_of_validator__WEBPACK_IMPORTED_MODULE_5__["requiredOneOf"]; });









/***/ }),

/***/ "./src/app/modules/shared/form-validators/link-validator.validator.ts":
/*!****************************************************************************!*\
  !*** ./src/app/modules/shared/form-validators/link-validator.validator.ts ***!
  \****************************************************************************/
/*! exports provided: linkValidator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "linkValidator", function() { return linkValidator; });
/* harmony import */ var _handy_ng_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @handy-ng/core */ "./src/app/handy/core/index.ts");

class LinkValidatorValidator extends _handy_ng_core__WEBPACK_IMPORTED_MODULE_0__["HandyNgSyncValidator"] {
    // Return true if value is invalid
    static isInValidIf(value) {
        return !LinkValidatorValidator.reg.test(value);
    }
    static validate(errMsg = 'This field is invalid') {
        return (control) => {
            let { value } = control;
            if (LinkValidatorValidator.emptyValueIsValid && LinkValidatorValidator.isEmpty(value)) {
                return null;
            }
            let invalid = LinkValidatorValidator.isInValidIf(value);
            if (invalid) {
                return LinkValidatorValidator.returnError(errMsg);
            }
            // ! has to return null if field is valid
            return null;
        };
    }
}
LinkValidatorValidator.reg = new RegExp(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm);
const linkValidator = LinkValidatorValidator.validate;
// import linkValidator from '@ng-shared/form-validators';


/***/ }),

/***/ "./src/app/modules/shared/form-validators/max-files.validator.ts":
/*!***********************************************************************!*\
  !*** ./src/app/modules/shared/form-validators/max-files.validator.ts ***!
  \***********************************************************************/
/*! exports provided: maxFiles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "maxFiles", function() { return maxFiles; });
/* harmony import */ var _handy_ng_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @handy-ng/core */ "./src/app/handy/core/index.ts");

class MaxFilesValidator extends _handy_ng_core__WEBPACK_IMPORTED_MODULE_0__["HandyNgSyncValidator"] {
    // Return true if value is invalid
    static isInValidIf(value, maxFiles) {
        if (Array.isArray(value)) {
            return value.length > maxFiles;
        }
        return false;
    }
    static validate(maxFiles) {
        return (control) => {
            let { value } = control;
            if (MaxFilesValidator.emptyValueIsValid && MaxFilesValidator.isEmpty(value)) {
                return null;
            }
            let invalid = MaxFilesValidator.isInValidIf(value, maxFiles);
            if (invalid) {
                return MaxFilesValidator.returnError(`Max ${maxFiles} file${maxFiles > 1 ? 's' : ''} allowed`);
            }
            // ! has to return null if field is valid
            return null;
        };
    }
}
const maxFiles = MaxFilesValidator.validate;
// import maxFiles from '@ng-shared/form-validators';


/***/ }),

/***/ "./src/app/modules/shared/form-validators/required-one-of.validator.ts":
/*!*****************************************************************************!*\
  !*** ./src/app/modules/shared/form-validators/required-one-of.validator.ts ***!
  \*****************************************************************************/
/*! exports provided: requiredOneOf */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "requiredOneOf", function() { return requiredOneOf; });
/* harmony import */ var _handy_ng_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @handy-ng/core */ "./src/app/handy/core/index.ts");

class RequiredOneOfValidator extends _handy_ng_core__WEBPACK_IMPORTED_MODULE_0__["HandyNgSyncValidator"] {
    // Return true if value is invalid
    static isInValidIf(value = {}, fields) {
        let fieldsLen = fields.length;
        for (let i = 0; i < fieldsLen; i++) {
            const fieldName = fields[i];
            let isEMpty = RequiredOneOfValidator.isEmpty(value[fieldName]);
            if (!isEMpty) {
                return false;
            }
        }
        return true;
    }
    static validate(fields = [], errMsg) {
        return (control) => {
            let { value } = control;
            if (RequiredOneOfValidator.emptyValueIsValid && RequiredOneOfValidator.isEmpty(value)) {
                return null;
            }
            let invalid = RequiredOneOfValidator.isInValidIf(value, fields);
            if (invalid) {
                return RequiredOneOfValidator.returnError(errMsg);
            }
            // ! has to return null if field is valid
            return null;
        };
    }
}
RequiredOneOfValidator.emptyValueIsValid = false;
const requiredOneOf = RequiredOneOfValidator.validate;
// import requiredOnOf from '@ng-shared/form-validators';


/***/ }),

/***/ "./src/app/modules/shared/form-validators/time-slot.validator.ts":
/*!***********************************************************************!*\
  !*** ./src/app/modules/shared/form-validators/time-slot.validator.ts ***!
  \***********************************************************************/
/*! exports provided: timeSlot */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "timeSlot", function() { return timeSlot; });
/* harmony import */ var _handy_ng_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @handy-ng/core */ "./src/app/handy/core/index.ts");

class TimeSlotValidator extends _handy_ng_core__WEBPACK_IMPORTED_MODULE_0__["HandyNgSyncValidator"] {
    // Return true if value is invalid
    static isInValidIf(value, pairControl, thisFieldIs) {
        let otherValue = pairControl.value;
        let result = true;
        switch (thisFieldIs) {
            case 'from':
                result = (value + 1) > otherValue;
                break;
            default:
                result = (value - 1) < otherValue;
                break;
        }
        if (!pairControl.valid) {
            pairControl.updateValueAndValidity();
        }
        return result;
    }
    static validate(pairControl, thisFieldIs, errMsg = 'This field is invalid') {
        return (control) => {
            let { value } = control;
            let otherValue = pairControl.value;
            if (TimeSlotValidator.emptyValueIsValid && (TimeSlotValidator.isEmpty(value) || TimeSlotValidator.isEmpty(otherValue))) {
                return null;
            }
            let invalid = TimeSlotValidator.isInValidIf(value, pairControl, thisFieldIs);
            if (invalid) {
                return TimeSlotValidator.returnError(errMsg);
            }
            // ! has to return null if field is valid
            return null;
        };
    }
}
const timeSlot = TimeSlotValidator.validate;
// import timeSlot from '@ng-shared/form-validators';


/***/ })

}]);
//# sourceMappingURL=default~handy-modules-dev-dev-module~modules-auth-auth-module~modules-pdf-templates-pdf-templates-mo~c2f6e977.js.map