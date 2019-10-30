/*
Copyright 2019 LEE DONG GUN.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

const map=document.getElementById("js-map"),file_field=document.getElementById("js-upload-image"),img_element=document.getElementById("js-image"),map_option={target:map,layers:[new ol.layer.Tile({source:new ol.source.XYZ({attributions:map_attributions,attributionsCollapsible:!1,url:map_uri})})],view:new ol.View({center:ol.proj.fromLonLat([126.682121,35.945291]),zoom:16})},ext_map=$.jsolext.create(map_option);function ConvertDMSToDD(e,t,o,r){let n=e+t/60+o/3600;return"S"!=r&&"W"!=r||(n*=-1),n}function getExit(){return EXIF.getData(img_element,function(){const e=EXIF.getTag(this,"GPSLatitude"),t=EXIF.getTag(this,"GPSLatitudeRef"),o=EXIF.getTag(this,"GPSLongitude"),r=EXIF.getTag(this,"GPSLongitudeRef"),n=e[0].numerator,a=e[1].numerator,i=e[2].numerator,m=t,l=o[0].numerator,u=o[1].numerator,g=o[2].numerator,s=r,p=ConvertDMSToDD(n,a,i,m),c=ConvertDMSToDD(l,u,g,s),d=ext_map.Feature.CreateProperties("선택",null,img_element.src);ext_map.Layer.RemoveFromKey("Marker"),ext_map.Feature.InsertFromLineString("Marker",[c-2e-4,p+2e-4,c,p,c+3e-4,p+3e-4],d,ext_map.Style.yellow),ext_map.moveCenter(ol.proj.transform([c,p],"EPSG:4326","EPSG:3857"))})}ext_map.Style.addColor("yellow","rgba(0,0,0, 1)"),file_field.onchange=function(e){const t=(e.target||window.event.srcElement).files;if(FileReader&&t&&t.length){const o=new FileReader;o.onload=function(){img_element.src=o.result,e.target.value="",getExit()},o.readAsDataURL(t[0])}};