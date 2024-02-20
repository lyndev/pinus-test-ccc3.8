# 1、 creator 3.x  中使用pinus服务器的客户端模块
```
修改了对应的客户端源码
```
# 2、 修改了原始的通信编码，采用msgpack编码传输更新小
```
客户端安装模块: npm install msgpackr
```
# 3、如何使用修改后的coder.ts
```
1、git clone piuns源码后，执行
yarn
yarn build
将修改的code.ts代码覆盖到piuns/package/piuns/lib/connectors/common/code.ts
进入iuns/package/piuns目录
yarn run build
yarn link
2、在创建的服务器代码目录的game-server使用yarn link "pinus",关联本地的pinus中的pinus
3、执行pinus start即可
```
# 4、测试结果
![image](https://github.com/lyndev/pinus-test-ccc3.8/assets/14561386/58d99e13-d8f0-458b-a1cc-832805e6a56f)
