package com.healthdeclaration.services.impl;

import com.healthdeclaration.entities.Role;
import com.healthdeclaration.entities.User;
import com.healthdeclaration.entities.dto.UserDto;
import com.healthdeclaration.exception.ResourceNotFoundException;
import com.healthdeclaration.reposiories.RoleRepository;
import com.healthdeclaration.reposiories.UserRepository;
import com.healthdeclaration.services.CloudinaryService;
import com.healthdeclaration.services.UserService;
import com.healthdeclaration.util.enumeration.RoleType;
import com.healthdeclaration.util.enumeration.UserStatus;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final ModelMapper modelMapper;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final CloudinaryService cloudinaryService;

    private boolean isAdmin(String uniqueId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String currentUsername = userDetails.getUsername();

        User currentUser = userRepository.findByEmail(currentUsername)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", currentUsername));

       return currentUser.getRoles().stream().anyMatch(role -> role.getName().equals(RoleType.ADMIN));
    }

    private boolean isCurrentUser(String uniqueId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String currentUsername = userDetails.getUsername();

        User currentUser = userRepository.findByEmail(currentUsername)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", currentUsername));

        return currentUser.getUniqueId().equals(uniqueId);
    }

    @Override
    public UserDto findByUniqueId(String uniqueId) {
        return modelMapper.map(findUser(uniqueId), UserDto.class);
    }

    private User findUser(String uniqueId) {
        if (isAdmin(uniqueId) || isCurrentUser(uniqueId)) {
            return userRepository.findByUniqueId(uniqueId).orElseThrow(() -> new ResourceNotFoundException("User", "id", uniqueId));
        } else {
            throw new RuntimeException("Access Denied");
        }
    }

    @Override
    public UserDto update(String uniqueId, UserDto userDto, MultipartFile avatar) throws IOException {
        User user = findUser(uniqueId);

        user.setIdCard(userDto.getIdCard());
        user.setFullName(userDto.getFullName());
        user.setPhone(userDto.getPhone());
        user.setEmail(userDto.getEmail());
        user.setDateOfBirth(userDto.getDateOfBirth());
        user.setGender(userDto.getGender());
        user.setAddress(userDto.getAddress());
        user.setHealthInsuranceNumber(userDto.getHealthInsuranceNumber());

        if (avatar != null && !avatar.isEmpty() && ImageIO.read(avatar.getInputStream()) != null) {
            Map result = cloudinaryService.upload(avatar);
            String avatarUrl = (String) result.get("url");
            user.setAvatar(avatarUrl);
        }

        return modelMapper.map(userRepository.save(user), UserDto.class);
    }

    @Override
    public Page<UserDto> findAll(String search, int pageNo, int pageSize, String sortBy) {
        PageRequest pageRequest = PageRequest.of(pageNo, pageSize, Sort.by(sortBy != null ? sortBy : "id"));
        Page<User> pages;

        if (search != null && !search.isEmpty()) {
            pages = userRepository.findAllBySearch(search, pageRequest);
        } else {
            pages = userRepository.findAll(pageRequest);
        }

        return pages.map(user -> modelMapper.map(user, UserDto.class));
    }

    @Override
    public UserDto retrieveUser() {
        var context = SecurityContextHolder.getContext();
        String email = context.getAuthentication().getName();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("User", "email", email));

        return modelMapper.map(user, UserDto.class);
    }

    @Override
    public UserDto addRole(String uniqueId, List<RoleType> roleTypes) {
        User user = findUser(uniqueId);
        user.getRoles().clear();

        for (RoleType roleType : roleTypes) {
            Role role = roleRepository.findByName(roleType)
                    .orElseThrow(() -> new ResourceNotFoundException("Role", "name", roleType.name()));
            user.getRoles().add(role);
        }

        return modelMapper.map(userRepository.save(user), UserDto.class);
    }

    @Override
    public UserDto removeRoles(String uniqueId, List<RoleType> roleTypes) {
        User user = findUser(uniqueId);

        for (RoleType roleType : roleTypes) {
            Role role = roleRepository.findByName(roleType)
                    .orElseThrow(() -> new ResourceNotFoundException("Role", "name", roleType.name()));
            user.getRoles().remove(role);
        }

        return modelMapper.map(userRepository.save(user), UserDto.class);
    }

    @Override
    public UserDto changeStatus(String uniqueId, UserStatus status) {
        User user = findUser(uniqueId);
        user.setStatus(status);

        return modelMapper.map(userRepository.save(user), UserDto.class);
    }

    @Override
    public List<Role> findAllRoles() {
        return roleRepository.findAll();
    }
}
