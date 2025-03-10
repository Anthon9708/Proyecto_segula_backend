const IolocateService = require("../services/IolocateService");


// Obtener compañias
const getCompanies = async (req , res) => {
     try {
        const companies = await IolocateService.getCompanies();
        res.json(companies);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

// Obtener dispositivos por empresa
const getDeviceId = async (req, res) => {
    try {
        const { companyId } = req.params;
        const devices = await IoLocateService.getDevicesByCompanyId(companyId);
        res.json(devices);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
} 

// Obtener historial por dispositivo
const getDeviceIdHistory = async (req,res) => {
    try {
        const { deviceId } = req.params;
        const { from, to } = req.query;
        const history = await IoLocateService.getHistoryByDeviceId(
          deviceId,
          from,
          to
        );
        res.json(history);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

module.exports = { getCompanies , getDeviceId , getDeviceIdHistory }
