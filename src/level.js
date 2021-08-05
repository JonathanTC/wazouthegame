function Level() {
    this.data = null;
    this.tileset = new Image();

    this.load = function(data) {
        this.data = data;
        this.tileset.src = this.data.tilesets[0].image;
    }

    this.getTileType = function(x, y) {
        var pos = ( y * this.data.layers[0].width) + x;
        var idTile = this.data.layers[0].data[pos] - this.data.tilesets[0].firstgid;
        var element = this.data.tilesets[0].tiles.find(element => element.id === idTile);
        if(element != null) {
            return element.type;
        }

    }

    this.update = function() {
        //
    }

    this.draw = function(pCtx) {
        
        if(this.data != null) {
            var nbCol = this.data.layers[0].width;
            var nbLine = this.data.layers[0].height;
            var colTilset = this.data.tilesets[0].columns;
            
            let i = 0;
            for(let line = 0; line < nbLine; line++) 
            {
                for(let col = 0; col < nbCol; col++) 
                {
                    var idTile = this.data.layers[0].data[i];
                    if(idTile != 0) 
                    {
                        idTile -= 1;
                    
                        var yTile = Math.floor(idTile / colTilset);
                        var xTile = idTile - (yTile * colTilset);
                        var wTile = this.data.tilesets[0].tilewidth;
                        var hTile = this.data.tilesets[0].tileheight;
                        
                        pCtx.drawImage(this.tileset, xTile * wTile, yTile * hTile, wTile, hTile, col * wTile, line * hTile, wTile, hTile);  
                    }
                    i++;
                }
            }
        }

    }
}