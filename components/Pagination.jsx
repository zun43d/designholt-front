import { useEffect } from 'react';
import {
	Pagination,
	usePagination,
	PaginationNext,
	PaginationPage,
	PaginationPrevious,
	PaginationContainer,
	PaginationPageGroup,
	PaginationSeparator,
} from '@ajna/pagination';
import { productsPerPage } from '@/data/bussiness-data';

export default function PaginationComponent({
	totalProduct,
	handlePageIndexChange,
	pageIndex,
}) {
	const { currentPage, setCurrentPage, pagesCount, pages } = usePagination({
		total: totalProduct,
		limits: {
			inner: 2,
			outer: 2,
		},
		initialState: {
			pageSize: productsPerPage,
			currentPage: 1,
		},
	});

	useEffect(() => {
		setCurrentPage(pageIndex);

		return () => {
			setCurrentPage(1);
		};
	}, [pageIndex, setCurrentPage]);

	return (
		<Pagination
			pagesCount={pagesCount}
			currentPage={currentPage}
			onPageChange={(nextPage) => handlePageIndexChange(nextPage)}
		>
			<PaginationContainer
				my="5"
				flexWrap="wrap"
				justifyContent="center"
				alignItems="center"
			>
				<PaginationPageGroup
					spacing={3}
					gridRowGap={3}
					isInline
					align="center"
					flexWrap="wrap"
					separator={<PaginationSeparator fontSize="sm" w={7} jumpSize={11} />}
				>
					<PaginationPrevious w="24">Previous</PaginationPrevious>
					{pages.map((page) => (
						<PaginationPage
							key={`pagination_page_${page}`}
							page={page}
							w={10}
							_current={{
								bg: 'purple.500',
								color: 'white',
								pointerEvents: 'none',
								_hover: {
									bg: 'purple.500',
								},
								_active: {
									bg: 'purple.400',
								},
							}}
						/>
					))}
					<PaginationNext w="24">Next</PaginationNext>
				</PaginationPageGroup>
			</PaginationContainer>
		</Pagination>
	);
}
