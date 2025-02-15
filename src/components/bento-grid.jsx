"use client";

import PropTypes from "prop-types";

export const BentoGrid = ({ children }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {children}
  </div>
);

BentoGrid.propTypes = {
  children: PropTypes.node.isRequired,
};

export const BentoGridItem = ({
  title,
  description,
  content,
  header,
}) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4">
    {header}
    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
      {title}
    </h3>
    {description && (
      <p className="text-gray-600 dark:text-gray-400 mb-2">{description}</p>
    )}
    {content && <p className="text-gray-600 dark:text-gray-400">{content}</p>}
  </div>
);

BentoGridItem.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  content: PropTypes.string,
  image: PropTypes.string,
  header: PropTypes.node,
};
