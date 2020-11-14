import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from './store/actionCreators';
import { message } from 'antd';

const global = {
    map: undefined,
    didMount: false,
    ws: undefined,
    unMount: false,
    timer: 0,
}

class YJGMap extends Component {
    initInfoWindow(dev) {
        // 显示信息
        const html = `
            <div>设备名称: ${dev.Usnam} </div> 
            <div>设备编号: ${dev.key} </div>
            `;
        return html;

    }

    onMarkerClick(dev, point) {
        const { BMap } = window;
        let opt = {
            title: '设备信息',

        }
        var infoWindow = new BMap.InfoWindow(this.initInfoWindow(dev), opt);  // 创建信息窗口对象
        global.map.openInfoWindow(infoWindow, point); //开启信息窗口
    }
    componentDidMount() {
        const { BMap, BMAP_NORMAL_MAP, BMAP_HYBRID_MAP, BMAP_ANCHOR_TOP_RIGHT } = window;
        let map = new BMap.Map("allmap", { enableMapClick: false }); // 创建Map实例
        global.map = map;
        map.addEventListener("dragend", () => {    
            let center = map.getCenter();    
        }
        );
        map.setCurrentCity("杭州"); // 设置地图显示的城市 此项是必须设置的
        map.addControl(new BMap.MapTypeControl({
            mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP],
            anchor: BMAP_ANCHOR_TOP_RIGHT
        })); //添加地图类型控件
        //先指定一个固定的坐标，初始化地图,设置中心点坐标和地图级别 (杭州)
        map.centerAndZoom(new BMap.Point(120.1199897554, 30.3319434271), 11);
        //然后通过定位重新设置中心点
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition((r) => {
            if(r)
            {
                var mk = new BMap.Marker(r.point);
                map.centerAndZoom(new BMap.Point(r.point.lng, r.point.lat), 11); // 初始化地图,设置中心点坐标和地图级别
                this.props.search(r.point.lng, r.point.lat);
            }
            else
            {
                let center = map.getCenter();
                this.props.search(center.lng, center.lat);
            }
            //搜索附近设备
            map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
        });

        // marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
        // this.connect();
        // global.timer = setInterval(() => {
        //     if(global.ws && global.ws.readyState === WebSocket.OPEN)
        //     {
        //         let param = {
        //             Action: 2,
        //             Data: 'YJG',
        //         }
        //         global.ws.send(JSON.stringify(param));
        //     }else{

        //         if(!global.ws || global.ws.readyState !== WebSocket.CONNECTING)
        //         {
        //             this.connect();
        //         }
        //     }
        // }, 60000);
    }

    componentWillUpdate() {
        const { BMap } = window;
        global.map.clearOverlays();
        this.props.switchlist.map((dev) => {
            var point = new BMap.Point(dev.Lng, dev.Lat);
            var marker = new BMap.Marker(point);  // 创建标注
            global.map.addOverlay(marker);// 将标注添加到地图中
            marker.addEventListener("click", (e) => {
                // map.openInfoWindow(infoWindow, point); //开启信息窗口
                this.onMarkerClick(dev, point);
            });
        });
        global.didMount = true;
    }

    componentWillUnmount() {
        global.unMount = true;
        window.clearInterval(global.timer);
        this.disconnect();
    }

    render() {

        const { BMap } = window;
        if (global.didMount) {
            global.map.clearOverlays();
            this.props.switchlist.map((dev) => {
                var point = new BMap.Point(dev.Lng, dev.Lat);
                var marker = new BMap.Marker(point);  // 创建标注
                global.map.addOverlay(marker);// 将标注添加到地图中
                marker.addEventListener("click", (e) => {
                    // map.openInfoWindow(infoWindow, point); //开启信息窗口
                    this.onMarkerClick(dev, point);
                });
            });
        }
        return (
            <div >
                <div
                    id='allmap'
                    style={{
                        width: '100%',
                        height: 'calc(100vh - 64px)',//这里的64为Antd中Layout.Header的高度
                    }} />
            </div>
        )
    }

    disconnect() {
        if (global.ws && global.ws.readyState === WebSocket.OPEN) {
            global.ws.close();
        }
    }

    connect() {
        const { BMap } = window;
        if (global.ws && global.ws.readyState === WebSocket.OPEN) {
            //通道已打开
            return;
        }
        global.ws = new WebSocket('ws://' + 1024);
        global.ws.onopen = () => {
            let param = {
                Action: 1,
                Data: 'YJG',
            }
            global.ws.send(JSON.stringify(param));
        };
        global.ws.onmessage = (e) => {
            if (e.data === '注册成功') {
                message.success(e.data);
            }
            else if (e.data === '注册失败') {
                message.error(e.data);
            }
            else {
                let pushObj = JSON.parse(e.data);

                let dev = this.props.switchlist.find(item => item.key === pushObj.key);
                if (dev) {

                    Object.assign(dev, pushObj);
                    var point = new BMap.Point(dev.Lng, dev.Lat);

                    // map.openInfoWindow(infoWindow, point); //开启信息窗口
                    this.onMarkerClick(dev, point);
                }
            }

        };
    }

}

const mapStateToProps = (state) => {
    return {
        loading: state.switch_map.loading,
        switchlist: state.switch_map.switchlist,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        search(lng, lat) {
            let param = {
                Mac: '',
                Lat: lat,
                Lng: lng,
                SourceCoordType: 'bd09ll',
                TargetCoordType: 'bd09ll'
            };
            dispatch(actionCreators.getDoSearchDevsNearByAction(param));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(YJGMap);