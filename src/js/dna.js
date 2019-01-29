var THREE = require('three');

module.exports = {

    Strand : function(){
        this.geometry = generateDoubleHelix(-10,10,15,7.5);
        this.material = new THREE.MeshBasicMaterial({color : 'red', wireframe : true});
        this.mesh = new THREE.Mesh(this.geometry,this.material)

        function generateHelix(start, end, radius, pitch){
            var resultGeometry = new THREE.Geometry()
            for(i = start; i < end; i+=.05){
                var x = radius * Math.cos(i);
                var y = pitch * i;
                var z = radius * Math.sin(i);

                var geo = new THREE.SphereGeometry(.5,6,5);
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