import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
@ccclass('TestPinus')
export class TestPinus extends Component {
    @property(Node)
    btnClick: Node = null
    host: string
    port: number = 0
    bLogined: boolean = false
    start() {
        // this.loadServerList()
        this.btnClick.on("click", this.onClickTest, this)
        this.gateLogin()
        let onDis = this.onDis.bind(this)
        pinus.on('disconnect', onDis);

        pinus.on("test_push", (data) => {
            console.log("测试服务器推送消息,", data)
        });
    }

    public gateLogin() {
        pinus.init({
            host: "127.0.0.1",
            port: 3014,
            log: true
        }, () => {
            let data1 = { uid: "test_uid" }
            pinus.request("gate.gateHandler.queryEntry", data1, (data) => {
                console.log("获取正式服务器地址成功,", data)
                this.host = data['host']
                this.port = data['port']
                pinus.disconnect()
                this.connect(this.host, this.port)
            });
        })

    }

    public loadServerList() {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 400) {
                    var response = xhr.responseText
                    console.log("server list:", response)

                    let data = JSON.parse(response)[0]
                    this.host = data['url']
                    this.port = data['port']
                    this.connect(this.host, this.port)
                }
            }
        }
        xhr.open("GET", "http://127.0.0.1:18080/server_list", true)
        xhr.setRequestHeader("Content-Type", "application/json")
        let sendData = JSON.stringify({})
        xhr.send(sendData)
        xhr.timeout = 10000
    }

    connect(host, port) {
        pinus.init({
            host: host,
            port: port,
            log: true
        },  ()=> {
            let data1 = { test: "客户端登录" }
            pinus.request("connector.entryHandler.entry", data1, (data) => {
                console.log("连接成功,", data)
                this.bLogined = true
            });
        })
    }

    onClickTest() {
        let data1 = { test: "客户端点击测试" }
        pinus.request("connector.playerHandler.test", data1, (data) => {
            if (data.code === 200) {
                console.log("服务器收到点击效果成功", data.msg)
            } else {
                console.error("服务器收到点击效果失败")
            }
        });
    }

    onDis(event) {
        if (this.bLogined) {
            console.error("dis net, will re connect")
            this.connect(this.host, this.port)
        } else {
            console.log("还未登录")
        }
    }

    update(deltaTime: number) {

    }
}


