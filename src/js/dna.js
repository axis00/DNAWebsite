var THREE = require('three');

function randomFloat(min,max){
    return Math.random() * (min - max) + max;
}

module.exports = {

    Strand : function(dither){

        var start = -10;
        var end = 10;
        var radius = 15;
        var slope = 1;
        var t = radius * slope;
        var sphereSize = 1;

        this.geometry = generateStrand(start,end,radius,t);
        this.material = new THREE.MeshBasicMaterial({color : 'red', wireframe : true});
        this.mesh = new THREE.Mesh(this.geometry,this.material);

        function generateStrand(start,end,radius,t){
            var resultGeometry = new THREE.Geometry();
            resultGeometry.merge(generateDoubleHelix(start,end,radius,t));
            resultGeometry.merge(generateRungs(start * t, end * t, 15, Math.PI / 2, radius));
            return resultGeometry;
        }

        function generateHelix(start, end, radius, t){
            var resultGeometry = new THREE.Geometry();
            for(i = start; i < end; i+=.03){
                var x = radius * Math.cos(i) + randomFloat(-dither, dither);
                var y = t * i + randomFloat(-dither, dither);
                var z = radius * Math.sin(i) + randomFloat(-dither, dither);

                var geo = new THREE.SphereGeometry(sphereSize,6,5);
                geo.translate(x,y,z);

                resultGeometry.merge(geo);

            }

            return resultGeometry;
        }

        function generateDoubleHelix(start, end, radius, t){
            var resultGeometry = new THREE.Geometry();
            resultGeometry.merge(generateHelix(start,end,radius,t));
            resultGeometry.rotateY(Math.PI);
            resultGeometry.merge(generateHelix(start,end,radius,t));
            return resultGeometry;
        }

        function generateRungs(start, end, steps, twist, radius){

            var resultGeometry = new THREE.Geometry();

            var twistCount = 0;
            
            for(i = start; i < end; i += steps){
                var rungGeometry = new THREE.Geometry();
                for(j = -radius; j < radius; j += .5){
                    var x = j + randomFloat(-dither,dither);
                    var y = i + randomFloat(-dither,dither);
                    var z = randomFloat(-dither, dither);
                    
                    var geo = new THREE.SphereGeometry(sphereSize,6,5);
                    geo.translate(x,y,z);
                    rungGeometry.merge(geo);
                }

                rungGeometry.rotateY(twist * twistCount);
                twistCount++;
                
                resultGeometry.merge(rungGeometry);
            }

            return resultGeometry;

        }

    }

}