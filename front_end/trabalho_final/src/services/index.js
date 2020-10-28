import authService from "./auth.js";
import avisosService from "./avisos.js";
import calcService from "./calc.js";
import dataService from "./data.js";
import excelService from "./ExcelService.js";
import moduleService from "./module.js";
import userService from "./userService.js";
import vinhaService from "./vinha.js";
import riscoService from "./riscosService.js";
import sensorService from "./sensores";

export default {
  auth: authService,
  avisos: avisosService,
  calc: calcService,
  data: dataService,
  excel: excelService,
  module: moduleService,
  user: userService,
  vinha: vinhaService,
  risco: riscoService,
  sensores: sensorService
};