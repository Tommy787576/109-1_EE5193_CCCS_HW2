var axios = require('axios');
var moment = require('moment');
  
var token = process.env.token;
var endpoint = 'https://api.github.com/repos/Tommy787576/109-1_EE5193_CCCS_HW2/issues?access_token=' + token;
var today = moment().format('YYYY-MM-DD');
  
exports.handler = async (event, context, callback) => {
    if (!event.body) 
      return 'no body';
      
    const body = JSON.parse(event.body) || {}
    var article = body.comment.body
    var words = article.split(' ')
    var length = words.length
    
    var content = [
      '作文總字數: ' + length,
      '再接再厲'
    ].join('\n')

    var content2 = [
      '在下面請按照此格式繳交英文作文：',
      '```',
      '第一行為題目',
      '第二行後為本文',
      '```'
    ].join('\n')
    
    try {
      const result = await axios.post(endpoint, {
        title: '[英文作文總結] ' + today,
        body: content
      }, {
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        }
      })
    } 
    catch (err) {
      return err;
    }

    try {
      const result = await axios.post(endpoint, {
        title: '[英文作文]',
        body: content2
      }, {
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        }
      })
    } 
    catch (err) {
      return err;
    }
    
    return 'success'
};