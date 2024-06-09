package com.healthdeclaration.reposiories;

import com.healthdeclaration.model.response.PageResponse;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
@Slf4j
public class SearchRepository {

    @PersistenceContext
    private EntityManager entityManager;

    private static final String LIKE_FORMAT = "%%%s%%";

//    public PageResponse<?> findAllWithSearchAndSort(int pageNo, int pageSize, String search, String sortBy) {
//        log.info("Execute search with keyword={}", search);
//
//        StringBuilder sqlQuery = new StringBuilder("SELECT new com.healthdeclaration.entities.dto.PathologicalDto(p.id, p.name, p.description, p.type, p.status) FROM Pathological p WHERE 1=1");
//        if (StringUtils.hasLength(search)) {
//            sqlQuery.append(" OR lower(p.name) like lower(:name)");
//            sqlQuery.append(" OR lower(p.description) like lower(:description)");
//        }
//
//        if (StringUtils.hasLength(sortBy)) {
//            // name:asc|desc
//            Pattern pattern = Pattern.compile("(\\w+?)(:)(.*)");
//            Matcher matcher = pattern.matcher(sortBy);
//            if (matcher.find()) {
//                sqlQuery.append(String.format(" ORDER BY p.%s %s", matcher.group(1), matcher.group(3)));
//            }
//        }
//
//        // Get list of pathological
//        Query selectQuery = entityManager.createQuery(sqlQuery.toString());
//        if (StringUtils.hasLength(search)) {
//            selectQuery.setParameter("name", String.format(LIKE_FORMAT, search));
//            selectQuery.setParameter("description", String.format(LIKE_FORMAT, search));
//        }
//        selectQuery.setFirstResult(pageNo);
//        selectQuery.setMaxResults(pageSize);
//        List<?> pathological = selectQuery.getResultList();
//
//        // count
//        StringBuilder sqlCountQuery = new StringBuilder("SELECT COUNT(*) FROM Pathological p");
//        if (StringUtils.hasLength(search)) {
//            sqlCountQuery.append(" WHERE lower(p.name) like lower(?1)");
//            sqlCountQuery.append(" OR lower(p.description) like lower(?2)");
//        }
//
//        Query countQuery = entityManager.createQuery(sqlCountQuery.toString());
//        if (StringUtils.hasLength(search)) {
//            countQuery.setParameter(1, String.format(LIKE_FORMAT, search));
//            countQuery.setParameter(2, String.format(LIKE_FORMAT, search));
//            countQuery.getSingleResult();
//        }
//
//        Long totalElements = (Long) countQuery.getSingleResult();
//        log.info("totalElements={}", totalElements);
//
//        Pageable pageable = PageRequest.of(pageNo, pageSize);
//
//        Page<?> page = new PageImpl<>(pathological, pageable, totalElements);
//
//        return PageResponse.builder()
//                .page(pageNo)
//                .size(pageSize)
//                .total(page.getTotalPages())
//                .data(pathological)
//                .build();
//    }

//    public PageResponse<?> findAllWithSearchAndSort(int pageNo, int pageSize, String search, String sortBy) {
//
//    }
}
