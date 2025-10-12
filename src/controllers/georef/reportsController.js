const reportService = require('../../services/georef/ReportsSevice')

const getReports = async (req, res) =>{      
    const token =  req.headers.authorization
    const model =  req.params.model
    const result = await reportService.reports({token: token, modelo: model})
    res.json(result)
}


module.exports = {
getReports
}