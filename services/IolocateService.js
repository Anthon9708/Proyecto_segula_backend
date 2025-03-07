const axios = require("axios");

const IOLOCATE_BASE_URL = "https://api.iolocate.io";
const USERNAME = "monolitic"; // Solicítalo a support@iolocate.io
const PASSWORD = "Monol1tic!"; // Solicítalo a support@iolocate.io

class IoLocateService {
  constructor() {
    this.accessToken = null;
  }

  async authenticate() {
    try {
      const response = await axios.post(`${IOLOCATE_BASE_URL}/api/auth/token`, {
        username: USERNAME,
        password: PASSWORD,
      });

      if (response.data) {
        this.accessToken = response.data.token;
        console.log("🔐 Token obtenido correctamente");
        return this.accessToken;
      } else {
        throw new Error("No se recibió un token válido");
      }
    } catch (error) {
      console.error(
        "❌ Error al autenticar con IoLocate API:",
        error.response?.data || error.message
      );
      throw error;
    }
  }

  async getCompanies() {
    if (!this.accessToken) await this.authenticate();

    try {
      const response = await axios.get(`${IOLOCATE_BASE_URL}/api/companies`, {
        headers: { Authorization: `Bearer ${this.accessToken}` },
      });

      return response.data;
    } catch (error) {
      console.error(
        "❌ Error al obtener compañías:",
        error.response?.data || error.message
      );
      throw error;
    }
  }

  async getDevicesByCompanyId(companyId) {
    if (!this.accessToken) await this.authenticate();

    try {
      const response = await axios.get(
        `${IOLOCATE_BASE_URL}/api/companies/${companyId}/devices`,
        {
          headers: { Authorization: `Bearer ${this.accessToken}` },
        }
      );

      return response.data;
    } catch (error) {
      console.error(
        "❌ Error al obtener dispositivos:",
        error.response?.data || error.message
      );
      throw error;
    }
  }

  async getHistoryByDeviceId(deviceId, from, to) {
    if (!this.accessToken) await this.authenticate();

    try {
      const response = await axios.get(
        `${IOLOCATE_BASE_URL}/api/devices/${deviceId}/history`,
        {
          params: { from, to },
          headers: { Authorization: `Bearer ${this.accessToken}` },
        }
      );

      return response.data;
    } catch (error) {
      console.error(
        "❌ Error al obtener historial:",
        error.response?.data || error.message
      );
      throw error;
    }
  }
}

module.exports = new IoLocateService();
