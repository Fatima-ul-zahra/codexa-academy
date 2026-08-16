import {
  ArrowLeft,
  Check,
  Plus,
  Save,
  Trash2,
} from "lucide-react";

import { useEffect, useState } from "react";

const emptyCourse = {
  name: "",
  shortDescription: "",
  description: "",
  image: "",
  fee: "",
  duration: "",
  level: "Beginner",
  category: "",
  learningOutcomes: [""],
  syllabus: [
    {
      title: "",
      topics: [""],
    },
  ],
  technologies: [""],
  prerequisites: [""],
  certificate: false,
  featured: false,
  isActive: true,
};

function CourseForm({
  initialData = null,
  onSubmit,
  submitting = false,
  submitLabel = "Save Course",
  onCancel,
}) {
  const [form, setForm] =
    useState(emptyCourse);

  const [errors, setErrors] =
    useState({});

  useEffect(() => {
    if (!initialData) {
      setForm(emptyCourse);
      return;
    }

    setForm({
      ...emptyCourse,
      ...initialData,

      fee:
        initialData.fee !== undefined &&
        initialData.fee !== null
          ? String(initialData.fee)
          : "",

      learningOutcomes:
        initialData.learningOutcomes?.length
          ? initialData.learningOutcomes
          : [""],

      syllabus:
        initialData.syllabus?.length
          ? initialData.syllabus.map(
              (module) => ({
                title:
                  module.title || "",
                topics:
                  module.topics?.length
                    ? module.topics
                    : [""],
              })
            )
          : [
              {
                title: "",
                topics: [""],
              },
            ],

      technologies:
        initialData.technologies?.length
          ? initialData.technologies
          : [""],

      prerequisites:
        initialData.prerequisites?.length
          ? initialData.prerequisites
          : [""],
    });
  }, [initialData]);

  const updateField = (
    field,
    value
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    setErrors((current) => ({
      ...current,
      [field]: "",
    }));
  };

  const updateArrayItem = (
    field,
    index,
    value
  ) => {
    setForm((current) => {
      const updated = [
        ...current[field],
      ];

      updated[index] = value;

      return {
        ...current,
        [field]: updated,
      };
    });
  };

  const addArrayItem = (field) => {
    setForm((current) => ({
      ...current,
      [field]: [
        ...current[field],
        "",
      ],
    }));
  };

  const removeArrayItem = (
    field,
    index
  ) => {
    setForm((current) => {
      const updated = current[field].filter(
        (_, itemIndex) =>
          itemIndex !== index
      );

      return {
        ...current,
        [field]:
          updated.length > 0
            ? updated
            : [""],
      };
    });
  };

  const addModule = () => {
    setForm((current) => ({
      ...current,
      syllabus: [
        ...current.syllabus,
        {
          title: "",
          topics: [""],
        },
      ],
    }));
  };

  const removeModule = (index) => {
    setForm((current) => {
      const updated =
        current.syllabus.filter(
          (_, itemIndex) =>
            itemIndex !== index
        );

      return {
        ...current,
        syllabus:
          updated.length > 0
            ? updated
            : [
                {
                  title: "",
                  topics: [""],
                },
              ],
      };
    });
  };

  const updateModuleTitle = (
    moduleIndex,
    value
  ) => {
    setForm((current) => {
      const syllabus = [
        ...current.syllabus,
      ];

      syllabus[moduleIndex] = {
        ...syllabus[moduleIndex],
        title: value,
      };

      return {
        ...current,
        syllabus,
      };
    });
  };

  const addTopic = (moduleIndex) => {
    setForm((current) => {
      const syllabus = [
        ...current.syllabus,
      ];

      syllabus[moduleIndex] = {
        ...syllabus[moduleIndex],
        topics: [
          ...syllabus[moduleIndex].topics,
          "",
        ],
      };

      return {
        ...current,
        syllabus,
      };
    });
  };

  const updateTopic = (
    moduleIndex,
    topicIndex,
    value
  ) => {
    setForm((current) => {
      const syllabus = [
        ...current.syllabus,
      ];

      const topics = [
        ...syllabus[moduleIndex].topics,
      ];

      topics[topicIndex] = value;

      syllabus[moduleIndex] = {
        ...syllabus[moduleIndex],
        topics,
      };

      return {
        ...current,
        syllabus,
      };
    });
  };

  const removeTopic = (
    moduleIndex,
    topicIndex
  ) => {
    setForm((current) => {
      const syllabus = [
        ...current.syllabus,
      ];

      const topics =
        syllabus[moduleIndex].topics.filter(
          (_, index) =>
            index !== topicIndex
        );

      syllabus[moduleIndex] = {
        ...syllabus[moduleIndex],
        topics:
          topics.length > 0
            ? topics
            : [""],
      };

      return {
        ...current,
        syllabus,
      };
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name =
        "Course name is required.";
    }

    if (!form.shortDescription.trim()) {
      newErrors.shortDescription =
        "Short description is required.";
    }

    if (!form.description.trim()) {
      newErrors.description =
        "Course description is required.";
    }

    if (
      form.fee === "" ||
      Number(form.fee) < 0
    ) {
      newErrors.fee =
        "Enter a valid course fee.";
    }

    if (!form.duration.trim()) {
      newErrors.duration =
        "Duration is required.";
    }

    if (!form.category.trim()) {
      newErrors.category =
        "Category is required.";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    const cleanArray = (items) =>
      items
        .map((item) => item.trim())
        .filter(Boolean);

    const cleanSyllabus =
      form.syllabus
        .map((module) => ({
          title: module.title.trim(),
          topics: cleanArray(
            module.topics
          ),
        }))
        .filter(
          (module) =>
            module.title ||
            module.topics.length > 0
        );

    const payload = {
      name: form.name.trim(),
      shortDescription:
        form.shortDescription.trim(),
      description:
        form.description.trim(),
      image: form.image.trim(),
      fee: Number(form.fee),
      duration:
        form.duration.trim(),
      level: form.level,
      category:
        form.category.trim(),
      learningOutcomes:
        cleanArray(
          form.learningOutcomes
        ),
      syllabus: cleanSyllabus,
      technologies:
        cleanArray(form.technologies),
      prerequisites:
        cleanArray(form.prerequisites),
      certificate: Boolean(
        form.certificate
      ),
      featured: Boolean(
        form.featured
      ),
      isActive: Boolean(
        form.isActive
      ),
    };

    await onSubmit(payload);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Basic information */}
      <FormSection
        title="Basic Information"
        description="Core information students will see about the course."
      >
        <div className="grid gap-5 md:grid-cols-2">
          <Field
            label="Course Name"
            required
            error={errors.name}
            className="md:col-span-2"
          >
            <input
              value={form.name}
              onChange={(event) =>
                updateField(
                  "name",
                  event.target.value
                )
              }
              placeholder="e.g. Full Stack Web Development"
              className={inputClass(
                errors.name
              )}
            />
          </Field>

          <Field
            label="Category"
            required
            error={errors.category}
          >
            <input
              value={form.category}
              onChange={(event) =>
                updateField(
                  "category",
                  event.target.value
                )
              }
              placeholder="e.g. Web Development"
              className={inputClass(
                errors.category
              )}
            />
          </Field>

          <Field
            label="Level"
            required
          >
            <select
              value={form.level}
              onChange={(event) =>
                updateField(
                  "level",
                  event.target.value
                )
              }
              className={inputClass()}
            >
              <option value="Beginner">
                Beginner
              </option>

              <option value="Intermediate">
                Intermediate
              </option>

              <option value="Advanced">
                Advanced
              </option>
            </select>
          </Field>

          <Field
            label="Course Fee (PKR)"
            required
            error={errors.fee}
          >
            <input
              type="number"
              min="0"
              value={form.fee}
              onChange={(event) =>
                updateField(
                  "fee",
                  event.target.value
                )
              }
              placeholder="25000"
              className={inputClass(
                errors.fee
              )}
            />
          </Field>

          <Field
            label="Duration"
            required
            error={errors.duration}
          >
            <input
              value={form.duration}
              onChange={(event) =>
                updateField(
                  "duration",
                  event.target.value
                )
              }
              placeholder="e.g. 3 Months"
              className={inputClass(
                errors.duration
              )}
            />
          </Field>

          <Field
            label="Course Image URL"
            className="md:col-span-2"
          >
            <input
              type="url"
              value={form.image}
              onChange={(event) =>
                updateField(
                  "image",
                  event.target.value
                )
              }
              placeholder="https://example.com/course-image.jpg"
              className={inputClass()}
            />

            <p className="mt-1.5 text-xs text-slate-500">
              Image uploading will be added later.
            </p>
          </Field>

          <Field
            label="Short Description"
            required
            error={
              errors.shortDescription
            }
            className="md:col-span-2"
          >
            <textarea
              rows={3}
              maxLength={300}
              value={
                form.shortDescription
              }
              onChange={(event) =>
                updateField(
                  "shortDescription",
                  event.target.value
                )
              }
              placeholder="Short description for course cards."
              className={inputClass(
                errors.shortDescription
              )}
            />

            <p className="mt-1.5 text-right text-xs text-slate-400">
              {form.shortDescription.length}
              /300
            </p>
          </Field>

          <Field
            label="Complete Description"
            required
            error={errors.description}
            className="md:col-span-2"
          >
            <textarea
              rows={6}
              value={form.description}
              onChange={(event) =>
                updateField(
                  "description",
                  event.target.value
                )
              }
              placeholder="Write the complete course description..."
              className={inputClass(
                errors.description
              )}
            />
          </Field>
        </div>
      </FormSection>

      {/* Learning outcomes */}
      <FormSection
        title="Learning Outcomes"
        description="What students will be able to do after completing this course."
      >
        <DynamicList
          items={form.learningOutcomes}
          placeholder="e.g. Build responsive websites"
          onChange={(index, value) =>
            updateArrayItem(
              "learningOutcomes",
              index,
              value
            )
          }
          onAdd={() =>
            addArrayItem(
              "learningOutcomes"
            )
          }
          onRemove={(index) =>
            removeArrayItem(
              "learningOutcomes",
              index
            )
          }
        />
      </FormSection>

      {/* Syllabus */}
      <FormSection
        title="Course Syllabus"
        description="Organize your curriculum into modules and topics."
      >
        <div className="space-y-5">
          {form.syllabus.map(
            (module, moduleIndex) => (
              <div
                key={moduleIndex}
                className="rounded-2xl border border-slate-200 p-5 dark:border-slate-800"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    Module{" "}
                    {moduleIndex + 1}
                  </h3>

                  <button
                    type="button"
                    onClick={() =>
                      removeModule(
                        moduleIndex
                      )
                    }
                    className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>

                <input
                  value={module.title}
                  onChange={(event) =>
                    updateModuleTitle(
                      moduleIndex,
                      event.target.value
                    )
                  }
                  placeholder="Module title"
                  className={`${inputClass()} mt-4`}
                />

                <div className="mt-4 space-y-3">
                  {module.topics.map(
                    (
                      topic,
                      topicIndex
                    ) => (
                      <div
                        key={topicIndex}
                        className="flex gap-2"
                      >
                        <input
                          value={topic}
                          onChange={(
                            event
                          ) =>
                            updateTopic(
                              moduleIndex,
                              topicIndex,
                              event
                                .target
                                .value
                            )
                          }
                          placeholder="Topic"
                          className={inputClass()}
                        />

                        <button
                          type="button"
                          onClick={() =>
                            removeTopic(
                              moduleIndex,
                              topicIndex
                            )
                          }
                          className="rounded-xl border border-slate-300 px-3 text-slate-400 hover:border-red-300 hover:text-red-600 dark:border-slate-700"
                        >
                          <Trash2
                            size={16}
                          />
                        </button>
                      </div>
                    )
                  )}
                </div>

                <button
                  type="button"
                  onClick={() =>
                    addTopic(moduleIndex)
                  }
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400"
                >
                  <Plus size={16} />
                  Add Topic
                </button>
              </div>
            )
          )}

          <button
            type="button"
            onClick={addModule}
            className="inline-flex items-center gap-2 rounded-xl border border-dashed border-blue-300 px-4 py-3 text-sm font-semibold text-blue-600 hover:bg-blue-50 dark:border-blue-900 dark:text-blue-400 dark:hover:bg-blue-950/20"
          >
            <Plus size={17} />
            Add Module
          </button>
        </div>
      </FormSection>

      {/* Technologies */}
      <FormSection
        title="Technologies"
        description="Technologies and tools covered in the course."
      >
        <DynamicList
          items={form.technologies}
          placeholder="e.g. React"
          onChange={(index, value) =>
            updateArrayItem(
              "technologies",
              index,
              value
            )
          }
          onAdd={() =>
            addArrayItem(
              "technologies"
            )
          }
          onRemove={(index) =>
            removeArrayItem(
              "technologies",
              index
            )
          }
        />
      </FormSection>

      {/* Prerequisites */}
      <FormSection
        title="Prerequisites"
        description="Knowledge or requirements students should have before starting."
      >
        <DynamicList
          items={form.prerequisites}
          placeholder="e.g. Basic computer knowledge"
          onChange={(index, value) =>
            updateArrayItem(
              "prerequisites",
              index,
              value
            )
          }
          onAdd={() =>
            addArrayItem(
              "prerequisites"
            )
          }
          onRemove={(index) =>
            removeArrayItem(
              "prerequisites",
              index
            )
          }
        />
      </FormSection>

      {/* Settings */}
      <FormSection
        title="Course Settings"
        description="Control how this course behaves on the public website."
      >
        <div className="grid gap-4 sm:grid-cols-3">
          <Toggle
            label="Featured"
            description="Show as a featured course."
            checked={form.featured}
            onChange={(value) =>
              updateField(
                "featured",
                value
              )
            }
          />

          <Toggle
            label="Active"
            description="Make course visible publicly."
            checked={form.isActive}
            onChange={(value) =>
              updateField(
                "isActive",
                value
              )
            }
          />

          <Toggle
            label="Certificate"
            description="Certificate available."
            checked={form.certificate}
            onChange={(value) =>
              updateField(
                "certificate",
                value
              )
            }
          />
        </div>
      </FormSection>

      {/* Actions */}
      <div className="sticky bottom-4 z-20 flex flex-col-reverse gap-3 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-xl backdrop-blur sm:flex-row sm:justify-end dark:border-slate-800 dark:bg-slate-900/95">
        <button
          type="button"
          onClick={onCancel}
          disabled={submitting}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          <ArrowLeft size={17} />
          Cancel
        </button>

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Saving...
            </>
          ) : (
            <>
              <Save size={17} />
              {submitLabel}
            </>
          )}
        </button>
      </div>
    </form>
  );
}

function FormSection({
  title,
  description,
  children,
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 dark:border-slate-800 dark:bg-slate-900">
      <div className="border-b border-slate-200 pb-5 dark:border-slate-800">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          {title}
        </h2>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {description}
        </p>
      </div>

      <div className="pt-6">
        {children}
      </div>
    </section>
  );
}

function Field({
  label,
  required,
  error,
  className = "",
  children,
}) {
  return (
    <div className={className}>
      <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
        {label}

        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}
      </label>

      {children}

      {error && (
        <p className="mt-1.5 text-xs font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

function DynamicList({
  items,
  placeholder,
  onChange,
  onAdd,
  onRemove,
}) {
  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div
          key={index}
          className="flex gap-2"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-sm font-bold text-slate-500 dark:bg-slate-800">
            {index + 1}
          </div>

          <input
            value={item}
            onChange={(event) =>
              onChange(
                index,
                event.target.value
              )
            }
            placeholder={placeholder}
            className={inputClass()}
          />

          <button
            type="button"
            onClick={() =>
              onRemove(index)
            }
            className="rounded-xl border border-slate-300 px-3 text-slate-400 hover:border-red-300 hover:text-red-600 dark:border-slate-700"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={onAdd}
        className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400"
      >
        <Plus size={16} />
        Add Item
      </button>
    </div>
  );
}

function Toggle({
  label,
  description,
  checked,
  onChange,
}) {
  return (
    <button
      type="button"
      onClick={() =>
        onChange(!checked)
      }
      className="flex w-full items-start gap-3 rounded-xl border border-slate-200 p-4 text-left transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800"
    >
      <span
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${
          checked
            ? "border-blue-600 bg-blue-600 text-white"
            : "border-slate-300 dark:border-slate-600"
        }`}
      >
        {checked && (
          <Check size={13} />
        )}
      </span>

      <span>
        <span className="block text-sm font-semibold text-slate-900 dark:text-white">
          {label}
        </span>

        <span className="mt-1 block text-xs leading-5 text-slate-500 dark:text-slate-400">
          {description}
        </span>
      </span>
    </button>
  );
}

function inputClass(error = "") {
  return `w-full rounded-xl border ${
    error
      ? "border-red-400"
      : "border-slate-300 dark:border-slate-700"
  } bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:bg-slate-950 dark:text-white`;
}

export default CourseForm;