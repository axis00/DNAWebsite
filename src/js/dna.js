var THREE = require('three');

function randomFloat(min,max){
    return Math.random() * (min - max) + max;
}

module.exports = {

    Strand : function(dither){
        this.geometry = generateDoubleHelix(-10,10,15,10);
        this.material = new THREE.MeshBasicMaterial({color : 'red', wireframe : true});
        this.mesh = new THREE.Mesh(this.geometry,this.material);

        function generateHelix(start, end, radius, pitch){
            var resultGeometry = new THREE.Geometry();
            for(i = start; i < end; i+=.03){
                var x = radius * Math.cos(i) + randomFloat(-dither, dither);
                var y = pitch * i + randomFloat(-dither, dither);
                var z = radius * Math.sin(i) + randomFloat(-dither, dither);

                var geo = new THREE.SphereGeometry(1,6,5);
                geo.translate(x,y,z);

                resultGeometry.merge(geo);

            }

            return resultGeometry;
        }

        function generateDoubleHelix(start, end, radius, pitch){
            var resultGeometry = new THREE.Geometry();
            resultGeometry.merge(generateHelix(start,end,radius,pitch));
            resultGeometry.rotateY(Math.PI);
            resultGeometry.merge(generateHelix(start,end,radius,pitch));
            return resultGeometry;
        }


    }

}