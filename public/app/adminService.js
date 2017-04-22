angular.module(`DesignDoc`).service(`adminService`,function($http){

  //===display principles===\\
  this.getPrinciples=()=>{
    return $http.get(`/api/principles`).then((r)=>{
      let objects=[...r.data];
      let principles=[];
      objects.map((x)=>{
        principles.push(x.name.toUpperCase());
      })
      return principles;
    })
  }

  //===send post to server===\\
  this.sendPost=(p)=>{
    console.log(p);
    imageExtensionB = p.before.imageData.split(';')[0].split('/')
    imageExtensionB = imageExtensionB[imageExtensionB.length - 1];
    imageExtensionA = p.after.imageData.split(';')[0].split('/')
    imageExtensionA = imageExtensionA[imageExtensionA.length - 1];

    p.before={
      imageBody: p.before.imageData,
      imageName: p.before.filename,
      imageExtension: imageExtensionB,
      userEmail: `brennonschow@gmail.com`
    };
    p.after={
      imageBody: p.after.imageData,
      imageName: p.after.filename,
      imageExtension: imageExtensionA,
      userEmail: `brennonschow@gmail.com`
    }

    return $http.put(`/api/upload`,p).then((r) =>{
      console.log(r);
    });
  }
});
