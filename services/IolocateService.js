const axios = require("axios");

const IOLOCATE_BASE_URL = process.env.IOLOCATE_BASE_URL;
const USERNAME = process.env.USER_NAME;
const PASSWORD = process.env.PASSWORD;

class IoLocateService {
  constructor() {
    this.accessToken = null;
  }

  async authenticate() {
    try {
      const response = await axios.post(`${IOLOCATE_BASE_URL}/api/b2b/login`, {
        UserName: USERNAME,
        Password: PASSWORD,
      });

      console.log("Respuesta de autenticación:", response.data);

      if (response.data && response.data.AccessToken) {
        this.accessToken = response.data.AccessToken;
        console.log("Token obtenido correctamente:", this.accessToken);
        return this.accessToken;
      } else {
        throw new Error("No se recibió un token válido");
      }
    } catch (error) {
      console.error(
        "Error al autenticar con IoLocate API:",
        error.response?.data || error.message
      );
      throw error;
    }
  }

  async getCompanies() {
    if (!this.accessToken) await this.authenticate();

    try {
      const response = await axios.get(
        `${IOLOCATE_BASE_URL}/api/b2b/companies`,
        {
          headers: { "X-ApiToken": this.accessToken },
        }
      );

      return response.data;
    } catch (error) {
      console.error(
        "Error al obtener compañías:",
        error.response?.data || error.message
      );
      throw error;
    }
  }

  async getDevicesByCompanyId(companyId) {
    if (!this.accessToken) await this.authenticate();

    try {
      const response = await axios.get(
        `${IOLOCATE_BASE_URL}/api/b2b/companies/${companyId}/devices`,
        {
          headers: { "X-ApiToken": this.accessToken },
        }
      );

      return response.data;
    } catch (error) {
      console.error(
        "Error al obtener dispositivos:",
        error.response?.data || error.message
      );
      throw error;
    }
  }

  async getHistoryByDeviceId(companyId, deviceId) {
    if (!this.accessToken) await this.authenticate();

    try {
      const response = await axios.get(
        `${IOLOCATE_BASE_URL}/api/b2b/companies/${companyId}/devices/${deviceId}/logs`,
        {
          headers: { "X-ApiToken": this.accessToken },
        }
      );

      return response.data;
    } catch (error) {
      console.error(
        "Error al obtener historial:",
        error.response?.data || error.message
      );
      throw error;
    }
  }
}

module.exports = new IoLocateService();
