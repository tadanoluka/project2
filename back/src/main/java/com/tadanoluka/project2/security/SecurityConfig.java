package com.tadanoluka.project2.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .csrf(AbstractHttpConfigurer::disable)
                .cors(corsConfigurer -> corsConfigurer.configurationSource(request -> {
                    CorsConfiguration cors = new CorsConfiguration().applyPermitDefaultValues();
                    cors.setAllowedOriginPatterns(List.of("*", "**"));
                    cors.addAllowedMethod(HttpMethod.POST);
                    cors.addAllowedMethod(HttpMethod.PATCH);
                    cors.addAllowedMethod(HttpMethod.GET);
                    return cors;
                }))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(request -> request
//                        .requestMatchers("/api/v1/secured/").fullyAuthenticated()
                        .anyRequest().permitAll());
        return httpSecurity.build();

    }

}
