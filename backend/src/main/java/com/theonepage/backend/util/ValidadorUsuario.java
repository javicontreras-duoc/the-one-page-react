package com.theonepage.backend.util;

import java.util.regex.Pattern;

public class ValidadorUsuario {
    
    private static final Pattern EMAIL_PATTERN = Pattern.compile("^[A-Za-z0-9._%+-]+@(duoc\\.cl|profesor\\.duoc\\.cl|gmail\\.com)$", Pattern.CASE_INSENSITIVE);

    public static boolean esCorreoValido(String correo) { 
        return correo != null && EMAIL_PATTERN.matcher(correo.trim()).matches(); 
    }

    public static boolean esRunValido(String run) { 
        if (run == null) return false; 
        String runLimpio = run.replace(".", "").replace("-", "").toUpperCase().trim(); 
        if (runLimpio.length() < 8 || runLimpio.length() > 9) return false; 
        
        try { 
            String cuerpo = runLimpio.substring(0, runLimpio.length() - 1); 
            char dvIngresado = runLimpio.charAt(runLimpio.length() - 1); 
            
            int suma = 0; 
            int multiplicador = 2; 
            for (int i = cuerpo.length() - 1; i >= 0; i--) { 
                suma += Character.getNumericValue(cuerpo.charAt(i)) * multiplicador; 
                multiplicador = (multiplicador == 7) ? 2 : multiplicador + 1; 
            } 
            
            int resto = 11 - (suma % 11); 
            char dvEsperado = (resto == 11) ? '0' : (resto == 10) ? 'K' : Character.forDigit(resto, 10); 
            
            return dvIngresado == dvEsperado; 
        } catch (Exception e) { 
            return false; 
        } 
    }
}
