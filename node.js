var port = (process.env.VMC_APP_PORT || 3000);
var host = (process.env.VCAP_APP_HOST || 'localhost');
var http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('<html><head><title>SJTUG</title></head><body><h1>Hello world from SJTUG</h1><p>SJTUG is formally known as SJTU *nix User Group, also known as <b>S</b>JTUG\'s a <b>J</b>oyful <b>T</b>echie <b>U</b>ser <b>G</b>roup.</p><p>Join us: <br/><ul><li>Mailing list: <a href="mailto:sjtug+subscribe@googlegroups.com">sjtug+subscribe@googlegroups.com</a></li><li>GitHub organization: <a href="https://github.com/sjtug">https://github.com/sjtug</a></li></ul></p><p>Our Schedules:</p><iframe src="http://www.google.com/calendar/embed?src=0e8ouf5q6fbnib5q0g65thn86c%40group.calendar.google.com&ctz=Asia/Chongqing" style="border: 0" width="400" height="400" frameborder="0" scrolling="no"></iframe></body></html>\n');
}).listen(port, host);


