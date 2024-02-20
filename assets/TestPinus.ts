import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { unpack, pack } from 'msgpackr';
@ccclass('TestPinus')
export class TestPinus extends Component {
    @property(Node)
    btnClick:Node =null
    
    start() {
        this.btnClick.on("click", this.onClickTest,this)
        this.connect()
        let onDis = this.onDis.bind(this)
        pinus.on('disconnect', onDis);
    }

    connect(){
        var host = "192.168.130.245";
        var port = "3010";
        pinus.init({
            host: host,
            port: port,
            log: true
        }, function () {
            let data1 = {test:"客户端登录"}
            let packData = pack(data1)
            console.log("data:",packData)
            pinus.request("connector.entryHandler.entry",packData, function (data) {
                console.log("sver data:",data)
                console.log("连接成功,", data)
            });
        })
    }

    onClickTest(){
        let data1 = {test:"客户端点击测试"}
        let packData = pack(data1)
        console.log("data:",packData)
        pinus.request("connector.playerHandler.test", packData , function (data) {
            console.log("sver data:",data)
            if(data.code===200){
                console.log("服务器收到点击效果成功", data.msg)
            } else {
                console.error("服务器收到点击效果失败")
            }
        });
    }

    onDis(event){
        console.error("dis net, will re connect")
        this.connect()
    }

    update(deltaTime: number) {

    }
}


