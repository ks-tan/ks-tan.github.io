class Matrix {
    rotateX(th) {
        return [
            [1,     0,              0,              0],
            [0,     Math.cos(th),   -Math.sin(th),  0],
            [0,     Math.sin(th),   Math.cos(th),   0],
            [0,     0,              0,              1]
        ];
    }
    
    rotateY(th) {
        return [
            [Math.cos(th),  0,      Math.sin(th),   0],
            [0,             1,      0,              0],
            [-Math.sin(th), 0,      Math.cos(th),   0],
            [0,             0,      0,              1]
        ];
    }
    
    rotateZ(th) {
        return [
            [Math.cos(th),  -Math.sin(th),  0,      0],
            [Math.sin(th),  Math.cos(th),   0,      0],
            [0,             0,              1,      0],
            [0,             0,              0,      1]
        ];
    }
    
    scale(x, y, z) {
        return [
            [x, 0, 0, 0], 
            [0, y, 0, 0], 
            [0, 0, z, 0], 
            [0, 0, 0, 1]
        ];
    }
    
    multiply(A, B) {
        if(A[0].length !== B.length) 
            return "A col != B row"
    
        const l = A.length;      // Number of rows in A
        const m = A[0].length;   // Number of columns in A and number of rows in B
        const n = B[0].length;   // Number of columns in B
        
        let C = []
    
        for(let i = 0; i < l; i++){
            C[i] = [];
            for(let j = 0; j < n; j++){
                C[i][j] = [];
            }
        }
        
        for(let row = 0; row < l ; row++){
            for(let col = 0; col < n; col++){
                let v = [];
                let w = [];
                for(let i = 0; i < m ; i++) {
                    v.push(A[row][i])
                    w.push(B[i][col])
                }
                C[row][col] = this.dot(v,w)
            }
        }
        return C;
    }
    
    dot(v, w) {
        let sum = 0;
        for (let i = 0; i < v.length; i++)
            sum += v[i] * w[i];
        return sum;
    }
    
    toFixed(mat, places) {
        let result = [];
        for(let row = 0; row < mat.length ; row++) {
            result[row] = [];
            for(let col = 0; col < mat[0].length; col++) {
                result[row][col] = mat[row][col];
                result[row][col] = result[row][col].toFixed(places);
            }
        }    
        return result;
    }

    transpose(mat) {
        let result = [];
        let height = mat.length;
        let length = mat[0].length;
        for (let row = 0; row < height; row++) {
            result[row] = [];
            for (let col = 0; col < length; col++) {
                result[row][col] = mat[col][row];
            }
        }
        return result;
    }
}

const KSMath = {
    toRadians (angle) { return angle * (Math.PI / 180); },
    toDegrees (angle) { return angle * (180 / Math.PI); }
};

KSMath.Matrix = new Matrix();