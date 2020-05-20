<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Modelos extends Model
{
    public function scopeBusto($query,$busto)
{
    if($busto>0){
        switch ($busto) {
            case 1:
             return $query->where('busto','<','C36');
            break;
                case 2:
                return $query->whereBetween('busto', array('B32','C38'));
                break;
                case 3:
                return $query->where('busto','>','C36');
                break;
            default:
                
                break;
    }
    }else{ 
        return $query->where('busto','>','A');
        }
       
    
}
public function scopeEstatura($query,$estatura)
{
    if($estatura>0){
        switch ($estatura) {
            case 1:
             return $query->where('medidas','<','1.50');
            break;
                case 2:
                return $query->whereBetween('medidas', array('1.50','1.65'));
                break;
                case 3:
                return $query->where('medidas','>','1.65');
                break;
            default:
                
                break;
    }
    }else{ 
        return $query->where('medidas','>','1.30');
        }
}
}
