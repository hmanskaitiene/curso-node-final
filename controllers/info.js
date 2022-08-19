import InformationService  from '../services/info.js';
const informationService = new InformationService();

const getInformation = (req, res) => {
    const response = informationService.getInformation();
    res.status(response.status).json(response.data)
}


export default {
    getInformation,
}