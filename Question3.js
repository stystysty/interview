let Koa = require('koa');
let app = new Koa();
let router = require('koa-router')();
let koaBody = require('koa-body');

let permissionMap = {
    "READ_INVENTORY_DASHBOARD": "商品统计查看",
    "READ_CONNECTION_DASHBOARD": "供应商统计查看",
    "MANAGE_DEPARTMENT": "部门管理",
    "MANAGE_USER": "员工管理"
};

let permissionTypeMap = {
    "DASHBOARD": "统计面板权限",
    "USER": "员工权限管理"
};

function mPermisisonDetail(type){
    let mpd=new Object();
    mpd.type=type;
    console.log(mpd.type)
    if(permissionMap[mpd.type]){
        mpd.name=permissionMap[mpd.type];
        console.log(mpd.name)
    }else {
        mpd.name='没有对应词条';
    }
    return mpd;
};

function mPermission(name,permissions){
    let mp=new Object();
    mp.permission_type=name;
    console.log(mp.permission_type)
    if(permissionTypeMap[mp.permission_type]){
        mp.permission_name=permissionMap[mp.permission_type];
    }else {
        mp.permission_name='没有对应词条';
    }
    mp.permissions=new Array();
    if(permissions){
        for(let i=0;i<permissions.length;i++){
            let mpd=mPermisisonDetail(permissions[i]);
            mp.permissions.push(mpd);
        }
    }
    return mp;
};

function mapPermissionName(permissions) {
    let mpList=new Array()
    if(permissions){
        for (let key in permissions){
            let mp=new mPermission(key,permissions[key].PERMISSIONS)
            mpList.push(mp)
        }
    }
    return JSON.stringify(mpList,null,'\t');
};

router.post('/permission', koaBody(),
    (ctx) => {
    console.log(ctx.request.body);
ctx.body =mapPermissionName(ctx.request.body);
}
);


app.use(router.routes());
app.listen(8080);

let test_input = {
    "DASHBOARD": {
        "PERMISSIONS": [
            "READ_INVENTORY_DASHBOARD",
            "READ_CONNECTION_DASHBOARD"
        ]
    },
    "USER": {
        "PERMISSIONS": [
            "MANAGE_DEPARTMENT",
            "MANAGE_USER"
        ]
    }
}

